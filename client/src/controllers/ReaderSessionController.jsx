/**
 * @file src/controllers/ReaderSessionController.jsx
 * @description
 * Manages session lifecycle for the PDF reader view.
 *
 * Responsibilities:
 * - Resolves the last opened book ID
 * - Determines the starting page for the session
 * - Tracks visible pages in scroll mode
 * - Computes and updates the current rendering range
 * - Triggers streaming for missing PDF page chunks
 *
 * Notes:
 * - Uses a stable reference to the range streamer
 * - Maintains a cache of stream keys to avoid duplicate requests
 * - Only renders children after the session is ready
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux'

import useLastOpenedBook from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage from '@/modules/reader/hooks/useStartingPage'
import useVisiblePages from '@reader/hooks/useVisiblePages'
import useRangeStreamer from '@reader/hooks/useRangeStreamer'

import {
  selectVisiblePagesByMode,
  selectPageViewMode,
} from '@/store/selectors/readerSelectors'
import {
  selectCurrentRange,
  selectStreamScale,
  selectPreloadedRanges,
} from '@/store/selectors/streamSelectors'

import { CHUNK_SIZE } from '@reader/utils/pdfConstants'
import { getRangeAround } from '@reader/utils/getRangeAround'
import { setCurrentRange } from '@/store/slices/streamSlice'

//-----------------------------------------------------------------------------
// Component: ReaderSessionController
//-----------------------------------------------------------------------------
/**
 * Initializes and manages the PDF reader session state.
 *
 * @param {Object} props
 * @param {React.RefObject} props.containerRef - Scroll container reference
 * @param {Function} props.children - Render function for children
 * @returns {JSX.Element|null}
 */
export default function ReaderSessionController({ children, containerRef }) {
  // Initialize book session
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)
  const ready = useStartingPage(resolvedBookId)

  // Redux state
  const dispatch = useDispatch()
  const store = useStore()
  const mode = useSelector(selectPageViewMode)
  const visiblePages = useSelector(selectVisiblePagesByMode)
  const currentRange = useSelector(selectCurrentRange)
  const scale = useSelector(selectStreamScale)
  const preloaded = useSelector(selectPreloadedRanges)[scale.toFixed(2)] ?? []

  // Track visible pages (scroll mode only)
  useVisiblePages(containerRef, 792)

  // Stable reference to range streamer
  const streamRangeRef = useRef(useRangeStreamer())

  // Cache of streamed keys
  const queuedRef = useRef(new Set())
  useEffect(() => queuedRef.current.clear(), [scale])

  // Update current rendering range
  useEffect(() => {
    if (!ready || !visiblePages.length) return

    const range = getRangeAround(visiblePages[0], CHUNK_SIZE)
    const cur = store.getState().stream.currentRange

    if (!cur || cur[0] !== range[0] || cur[1] !== range[1]) {
      dispatch(setCurrentRange(range))
    }
  }, [ready, visiblePages, dispatch, store])

  // Preload nearby chunks (prev | cur | next)
  useEffect(() => {
    if (!ready || !currentRange) return

    const curStart = currentRange[0]
    const curEnd = currentRange[1]

    const wants = [
      curStart - CHUNK_SIZE,
      curStart,
      curStart + CHUNK_SIZE,
    ].filter(s => s >= 1)

    const highest = Math.max(...visiblePages)
    const threshold = mode === 'double' ? 2 : 1
    if (curEnd - highest <= threshold) {
      wants.push(curStart + CHUNK_SIZE * 2)
    }

    wants.forEach(start => {
      if (preloaded.some(([s]) => s === start)) return

      const key = `${scale}-${start}`
      if (queuedRef.current.has(key)) return

      queuedRef.current.add(key)
      streamRangeRef.current([start, start + CHUNK_SIZE - 1])
    })
  }, [
    ready,
    currentRange,
    visiblePages,
    preloaded,
    scale,
    mode,
  ])

  // Block rendering until session is initialized
  if (!ready) return null
  return children({ containerRef })
}
