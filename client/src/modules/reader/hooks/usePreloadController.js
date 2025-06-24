//-----------------------------------------------------------------------------
// src/modules/reader/hooks/usePreloadController.js
//-----------------------------------------------------------------------------

import { useEffect, useRef }   from 'react'
import { useSelector }        from 'react-redux'
import {
  selectVisiblePages,
  selectPreloadedRanges,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { CHUNK_SIZE }          from '@reader/utils/pdfConstants'
import useRangeStreamer        from './useRangeStreamer'

export default function usePreloadController() {
  /* ---- data from Redux ------------------------------------------------- */
  const visible   = useSelector(selectVisiblePages)            // [ …page numbers… ]
  const scale     = useSelector(selectStreamScale)
  const preloaded = useSelector(selectPreloadedRanges)[scale.toFixed(2)] ?? []

  /* ---- range-streaming hook ------------------------------------------- */
  const streamRange = useRangeStreamer()
  const queuedRef   = useRef(new Set())   // de-dupe within a session

  /* ---- clear queue on scale change ------------------------------------ */
  useEffect(() => queuedRef.current.clear(), [scale])

  /* ---- main preload logic --------------------------------------------- */
  useEffect(() => {
    if (!visible.length) return

    /* 1 ▸ chunks where currently visible pages reside */
    const activeChunks = new Set(
      visible.map(p => Math.floor((p - 1) / CHUNK_SIZE) * CHUNK_SIZE + 1)
    )

    /* 2 ▸ expand the set with previous and next chunk for each */
    const targets = new Set()
    activeChunks.forEach(start => {
      if (start - CHUNK_SIZE >= 1) targets.add(start - CHUNK_SIZE) // prev
      targets.add(start)                                           // current
      targets.add(start + CHUNK_SIZE)                              // next
    })

    /* 3 ▸ schedule fetches if not cached or already queued */
    targets.forEach(start => {
      if (preloaded.some(([s]) => s === start)) return            // already cached
      const key = `${scale}-${start}`
      if (queuedRef.current.has(key)) return                      // already queued

      queuedRef.current.add(key)
      streamRange([start, start + CHUNK_SIZE - 1])
    })
  }, [visible, preloaded, scale, streamRange])
}
