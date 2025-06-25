//-----------------------------------------------------------------------------
// usePreloadController – dynamic rangeSize version
//-----------------------------------------------------------------------------
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  selectVisiblePages,
  selectPreloadedRanges,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { selectBookId }      from '@/store/selectors/readerSelectors'
import { selectBookById }    from '@/store/selectors/singleBookSelectors'
import { useGetBookRangesQuery } from '@/store/api/booksPrivateApi'  
import { CHUNK_SIZE }        from '@reader/utils/pdfConstants'
import useRangeStreamer      from './useRangeStreamer'

export default function usePreloadController() {
  /* --- basic slice data -------------------------------------------------- */
  const visible   = useSelector(selectVisiblePages)
  const scale     = useSelector(selectStreamScale)
  const rangesObj = useSelector(selectPreloadedRanges) || {}
  const preloaded = rangesObj[scale.toFixed(2)] ?? []

  /* --- dynamic rangeSize ------------------------------------------------- */
  const bookId    = useSelector(selectBookId)
  const book      = useSelector(selectBookById(bookId))
  const chunkSize = book?.file?.rangeSize ?? CHUNK_SIZE   
const { isFetching: rangesLoading } = useGetBookRangesQuery(bookId, { skip: !bookId })
  /* --- streaming helper -------------------------------------------------- */
  const streamRange = useRangeStreamer()
  const queuedRef   = useRef(new Set())

  /* --- reset queue on scale change -------------------------------------- */
  useEffect(() => queuedRef.current.clear(), [scale, chunkSize])

  /* --- schedule preloads ------------------------------------------------- */
  useEffect(() => {
    if (!visible.length || rangesLoading) return 

    const activeChunks = new Set(
      visible.map(p => Math.floor((p - 1) / chunkSize) * chunkSize + 1)
    )

    const targets = new Set()
    activeChunks.forEach(start => {
      if (start - chunkSize >= 1) targets.add(start - chunkSize) // previous
      targets.add(start)                                         // current
      targets.add(start + chunkSize)                             // next
    })

    const prioritized = Array.from(targets).map(start => {
      if (activeChunks.has(start))                return { start, priority: 0 }
      if (activeChunks.has(start - chunkSize))    return { start, priority: 1 }
      if (activeChunks.has(start + chunkSize))    return { start, priority: 2 }
      return { start, priority: 3 }
    })

    prioritized
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3)                                // max 3 fetches per cycle
      .forEach(({ start }) => {
        const key = `${scale}-${start}`
        if (queuedRef.current.has(key)) return
        if (preloaded.some(([s]) => s === start)) return

        queuedRef.current.add(key)
        streamRange([start, start + chunkSize - 1])
        console.debug('[Preload] scheduled', key)
      })
  }, [visible, preloaded, scale, chunkSize, streamRange])
}
