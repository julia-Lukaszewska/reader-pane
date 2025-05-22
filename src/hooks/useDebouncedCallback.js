/**
 * @file useDebouncedCallback.js
 * @description React hook to debounce a callback function. Useful for search, input, or resize.
 *
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced version of the function
 */

import { useRef, useEffect, useCallback } from 'react'

//-----------------------------------------------------------------------------
// Hook: useDebouncedCallback
// Debounces the provided function by the given delay
//-----------------------------------------------------------------------------

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
