//-----------------------------------------------------------------------------
// src/modules/reader/hooks/useRangeStreamer.js
//-----------------------------------------------------------------------------
import { useCallback, useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  setStreamStatus,
  addRenderedPage,
  addPreloadedRange,
  registerChunk,
  setLastLoadedAt,
  setError,
} from '@/store/slices/streamSlice'
import { useGetBookRangesQuery } from '@/store/api/booksPrivateApi'
import { selectAccessToken } from '@/store/selectors/authSelectors'

import { BitmapCache } from '@reader/utils/bitmapCache'
import pdfjsRenderToBitmaps from '@reader/utils/pdfjsRenderToBitmaps'
import { v4 as uuid } from 'uuid'
import { selectFileUrl } from '@/store/selectors/readerSelectors'
import throttle from 'lodash.throttle'

export default function useRangeStreamer() {
  const dispatch = useDispatch()
  const store = useStore()
  const scale = useSelector(s => s.stream.scale)
  const fileUrl = useSelector(selectFileUrl)
  const bookId = useSelector(s => s.reader.bookId)
  const filename = fileUrl ? fileUrl.split('/').pop() : null

  const { data } = useGetBookRangesQuery(bookId, { skip: !bookId })
  const ranges = data?.ranges ?? []

  const inFlightRef = useRef(new Set())
  const failedRef = useRef(new Set())

  const streamRange = useCallback(
    throttle(async ([start, end]) => {
      if (!filename) {
        dispatch(setError('File URL missing'))
        return
      }

      const scaleKey = scale.toFixed(2)
      const chunkKey = `${scaleKey}-${start}`
      const preloaded = store.getState().stream.preloadedRanges[scaleKey] ?? []

      if (
        preloaded.some(([s, e]) => s === start && e === end) ||
        inFlightRef.current.has(chunkKey) ||
        failedRef.current.has(chunkKey)
      ) {
        return
      }

      inFlightRef.current.add(chunkKey)
      dispatch(setStreamStatus('streaming'))

      try {
        // Choose static pre-generated or dynamic
        let blob
        const rangeMeta = ranges.find(r => start >= r.start && end <= r.end)
        const token = selectAccessToken(store.getState())
        const url = rangeMeta
          ? `${import.meta.env.VITE_API_URL}/books/storage/${rangeMeta.filename}`
          : `${import.meta.env.VITE_API_URL}/books/storage/${filename}/pages?start=${start}&end=${end}`
if (rangeMeta) {
  console.log('[Streamer]  static range:', rangeMeta.filename, rangeMeta)
} else {
  console.log('[Streamer]  dynamic range:', { start, end })
}
        const res = await fetch(url, {
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })

        if (!res.ok) {
          const msg = await res.text()
          throw new Error(msg || 'stream failed')
        }
        blob = await res.blob()

        if (!(blob instanceof Blob)) {
          throw new Error('Invalid Blob received')
        }

        const chunkSize = end - start + 1
        const pages = await pdfjsRenderToBitmaps(blob, {
          scale,
          start: 1,
          end: chunkSize,
        })

        pages.forEach(({ pageNumber, bitmap }) => {
          const globalPage = start + pageNumber - 1
          const id = uuid()
          BitmapCache.put(id, bitmap)
          dispatch(
            addRenderedPage({
              scale: scaleKey,
              pageNumber: globalPage,
              bitmapId: id,
            })
          )
        })

        dispatch(addPreloadedRange({ scale: scaleKey, range: [start, end] }))
        dispatch(registerChunk({ scale: scaleKey, range: [start, end] }))
        dispatch(setLastLoadedAt(Date.now()))
        dispatch(setStreamStatus('idle'))
      } catch (err) {
        console.error('[Streamer] error:', err)
        failedRef.current.add(chunkKey)
        dispatch(setError(err.message || 'stream error'))
        dispatch(setStreamStatus('error'))
      } finally {
        inFlightRef.current.delete(chunkKey)
      }
    }, 200),
    [filename, scale, dispatch, store, bookId, ranges]
  )

  return streamRange
}
