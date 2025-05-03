//-----------------------------------------------------------------------------
//------ useMenuItem: Custom hook to control menu tile behavior 
//-----------------------------------------------------------------------------

import { useEffect } from 'react' // React effect hook 
import { useNavigate, useLocation } from 'react-router-dom' // Router hooks 
import { useDispatch, useSelector } from 'react-redux' // Redux hooks 
import { setActiveItem, clearActiveItem } from '@/store' // UI slice actions 

const useMenuItem = (name, route) => {
  // const hook declaration 
  const navigate = useNavigate() // Navigation function 
  const location = useLocation() // Current route 
  const dispatch = useDispatch() // Redux dispatch 
  const activeItem = useSelector((state) => state.ui.activeItem) // Currently active menu 

  // Determine if this menu item is active 
  const $isActive = activeItem === name 

  // Handle click on menu tile 
  const handleClick = () => {
    if (activeItem && !$isActive) return // Ignore if another is active 
    if (!$isActive) dispatch(setActiveItem(name)) // Activate this item 
  }

  // Navigate to route on click 
  const handleNavigate = (e) => {
    e.stopPropagation() // Prevent event bubbling 
    navigate(route) // Go to route 
  }

  // Close active menu item 
  const handleClose = (e) => {
    e?.stopPropagation() // Prevent event bubbling 
    dispatch(clearActiveItem()) // Clear active item 
  }

  // On route change, clear active item when home 
  useEffect(() => {
    if (location.pathname === '/') dispatch(clearActiveItem()) 
  }, [location.pathname, dispatch]) // Dependencies 

  return { $isActive, handleClick, handleNavigate, handleClose } 
}

export default useMenuItem // Export hook 
