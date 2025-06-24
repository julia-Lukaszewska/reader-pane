//----------------------------------------------------------------------------- 
// ReaderSessionController.jsx  – UNIFIED STREAMING LOGIC
//----------------------------------------------------------------------------- 
/**
 * Kontroler sesji czytnika PDF.
 * • Obsługuje single / double / scroll
 * • Liczy pełny zakres widocznych stron → ustawia currentRange
 * • Pre‑loaduje poprzedni, bieżący, następny (i ewent. chunk ostatniej strony)
 * • Unika duplikatów dzięki cache w queuedRef
 */

//----------------------------------------------------------------------------- 
// Imports
//-----------------------------------------------------------------------------
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useLastOpenedBook  from '@/modules/reader/hooks/useLastOpenedBook'
import useStartingPage    from '@/modules/reader/hooks/useStartingPage'
import useVisiblePages    from '@reader/hooks/useVisiblePages'
import useRangeStreamer   from '@reader/hooks/useRangeStreamer'

import {
  selectVisiblePagesByMode,
  selectPageViewMode,
} from '@/store/selectors/readerSelectors'
import {
  selectCurrentRange,
  selectStreamScale,
  selectPreloadedRanges,
} from '@/store/selectors/streamSelectors'

import { CHUNK_SIZE, PAGE_HEIGHT } from '@reader/utils/pdfConstants'
import { setCurrentRange }        from '@/store/slices/streamSlice'
import { getRangeAround }         from '@reader/utils/getRangeAround'

//----------------------------------------------------------------------------- 
// Component
//-----------------------------------------------------------------------------
export default function ReaderSessionController({ children, containerRef }) {
  // Init książki -------------------------------------------------------------
  const { bookId: routeBookId } = useParams()
  const resolvedBookId = useLastOpenedBook(routeBookId)
  const ready          = useStartingPage(resolvedBookId)

  // Redux --------------------------------------------------------------------
  const dispatch      = useDispatch()
  const mode          = useSelector(selectPageViewMode)            // 'single' | 'double' | 'scroll'
  const visiblePages  = useSelector(selectVisiblePagesByMode)      // [n,…]
  const currentRange  = useSelector(selectCurrentRange)            // [start,end]
  const scale         = useSelector(selectStreamScale)
  const preloaded     = useSelector(selectPreloadedRanges)[scale.toFixed(2)] ?? []

  // Scroll‑mode: aktualizuj visiblePages -------------------------------------
  useVisiblePages(containerRef, PAGE_HEIGHT)

  // Stabilna funkcja pobierająca chunk
  const streamRange = useRangeStreamer()

  // Cache dla już zaplanowanych pobrań
  const queuedRef = useRef(new Set())
  useEffect(() => queuedRef.current.clear(), [scale])

  //---------------------------------------------------------------------------
  // 1) Wyznacz i zapisz currentRange na bazie PEŁNEGO widocznego zakresu
  //---------------------------------------------------------------------------
  useEffect(() => {
    if (!ready || !visiblePages.length) return

    const first = Math.min(...visiblePages)
    const range = getRangeAround(first, CHUNK_SIZE)       // [start,end] chunk pierwszej widocznej

    // Zapisz w store gdy się zmieni
    if (!currentRange || currentRange[0] !== range[0] || currentRange[1] !== range[1]) {
      dispatch(setCurrentRange(range))
    }
  }, [ready, visiblePages, currentRange, dispatch])

  //---------------------------------------------------------------------------
  // 2) Pre‑load: poprzedni | bieżący | następny (+ chunk ostatniej strony)
  //---------------------------------------------------------------------------
  useEffect(() => {
    if (!ready || !currentRange) return

    const curStart = currentRange[0]
    const wants = new Set([
      curStart - CHUNK_SIZE,
      curStart,
      curStart + CHUNK_SIZE,
    ].filter(s => s >= 1))

    // Jeżeli ostatnia widoczna strona wpada w dalszy chunk – dodaj go
    const lastVisible    = Math.max(...visiblePages)
    const lastChunkStart = Math.floor((lastVisible - 1) / CHUNK_SIZE) * CHUNK_SIZE + 1
    wants.add(lastChunkStart)

    // Look‑ahead przy trybie double (przewijanie dwóch stron jednocześnie)
    const threshold = mode === 'double' ? 2 : 1
    if (currentRange[1] - lastVisible <= threshold) {
      wants.add(curStart + CHUNK_SIZE * 2)
    }

    // Zaplanuj pobrania -------------------------------------------------------
    wants.forEach(start => {
      if (preloaded.some(([s]) => s === start)) return            // już w cache

      const key = `${scale}-${start}`
      if (queuedRef.current.has(key)) return                     // już zaplanowany

      queuedRef.current.add(key)
      streamRange([start, start + CHUNK_SIZE - 1])
    })
  }, [ready, currentRange, visiblePages, preloaded, scale, mode, streamRange])

  //---------------------------------------------------------------------------
  // Render dzieci po pełnym init‑cie
  //---------------------------------------------------------------------------
  if (!ready) return null
  return children({ containerRef })
}
