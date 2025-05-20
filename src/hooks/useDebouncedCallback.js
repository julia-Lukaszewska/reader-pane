//-----------------------------------------------------------------------------
// useDebouncedCallback: debounce any callback by delay ms
//-----------------------------------------------------------------------------

import { useRef, useEffect, useCallback } from 'react'

/**
 * Returns a debounced version of the provided function.
 * `fn(...args)` will run only after `delay` ms from the last call.
 */
export default function useDebouncedCallback(fn, delay) {
  const timer = useRef(null)

  const debounced = useCallback((...args) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }, [fn, delay])

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [fn, delay])

  return debounced
}
