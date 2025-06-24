//-----------------------------------------------------------------------------
// src/modules/reader/hooks/usePreloadController.js – optimized version
//-----------------------------------------------------------------------------
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  selectVisiblePages,
  selectPreloadedRanges,
  selectStreamScale,
} from '@/store/selectors/streamSelectors'
import { CHUNK_SIZE } from '@reader/utils/pdfConstants'
import useRangeStreamer from './useRangeStreamer'

export default function usePreloadController() {
  const visible   = useSelector(selectVisiblePages)
  const scale     = useSelector(selectStreamScale)
  const preloaded = useSelector(selectPreloadedRanges)[scale.toFixed(2)] ?? []

  const streamRange = useRangeStreamer()
  const queuedRef = useRef(new Set())

  useEffect(() => queuedRef.current.clear(), [scale])

  useEffect(() => {
    if (!visible.length) return

    const activeChunks = new Set(
      visible.map(p => Math.floor((p - 1) / CHUNK_SIZE) * CHUNK_SIZE + 1)
    )

    const targets = new Set()
    activeChunks.forEach(start => {
      if (start - CHUNK_SIZE >= 1) targets.add(start - CHUNK_SIZE)
      targets.add(start)
      targets.add(start + CHUNK_SIZE)
    })

    const prioritized = Array.from(targets).map(start => {
      const priority = activeChunks.has(start)
        ? 0
        : activeChunks.has(start - CHUNK_SIZE) || activeChunks.has(start + CHUNK_SIZE)
        ? 1
        : 2
      return { start, priority }
    })

    prioritized
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 4) // limit to 4 chunks per cycle
      .forEach(({ start }) => {
        const key = `${scale}-${start}`
        if (queuedRef.current.has(key)) return
        if (preloaded.some(([s]) => s === start)) return

        queuedRef.current.add(key)
        streamRange([start, start + CHUNK_SIZE - 1])
        console.debug('[Preload] scheduled', key)
      })
  }, [visible, preloaded, scale, streamRange])
}
