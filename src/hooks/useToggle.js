import { useState, useCallback } from 'react' 

const useToggle = () => {
 
  const [isOpen, setIsOpen] = useState(false)  
  const open = useCallback(() => setIsOpen(true), [])  
  const close = useCallback(() => setIsOpen(false), []) 
  return [isOpen, open, close]  
}

export default useToggle 
