/**
 * @file useToggle.js
 * @description Simple hook for controlling open/close state (e.g. modals, dropdowns).
 *
 * @returns {[boolean, Function, Function]} Tuple: [isOpen, open(), close()]
 */

import { useState, useCallback } from 'react'

//-----------------------------------------------------------------------------
// Hook: useToggle
// Manages a boolean open/closed state
//-----------------------------------------------------------------------------

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return [isOpen, open, close]
}

export default useToggle
