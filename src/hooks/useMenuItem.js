// -----------------------------------------------------------------------------
//------ useMenuItem: Custom hook to control menu tile behavior  
// -----------------------------------------------------------------------------

import { useEffect, useContext } from 'react' // React hook for side effects  
import { useNavigate, useLocation } from 'react-router-dom' // Routing hooks  
import { AppContext } from '../context/AppContext' // App-wide context state  

export const useMenuItem = (name, route) => {
  const navigate = useNavigate() // Function to navigate to route  
  const location = useLocation() // Get current path  
  const { state, dispatch } = useContext(AppContext) // Get global state and dispatcher  

  const $isActive = state.activeItem === name // Is this tile active?  

  // ---------------------------------------------------------------------------
  //------ handleClick: activate tile if none or same is active  
  // ---------------------------------------------------------------------------
  const handleClick = () => {
    if (state.activeItem && !$isActive) return // Ignore if other tile is active  
    if (!$isActive) {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: name }) // Activate this tile  
    }
  }

  // ---------------------------------------------------------------------------
  //------ handleNavigate: navigate to tile route  
  // ---------------------------------------------------------------------------
  const handleNavigate = (e) => {
    e.stopPropagation() // Stop click bubbling  
    navigate(route) // Go to assigned route  
  }

  // ---------------------------------------------------------------------------
  //------ handleClose: deactivate the tile  
  // ---------------------------------------------------------------------------
  const handleClose = (e) => {
    if (e?.stopPropagation) e.stopPropagation() // Optional: stop event  
    dispatch({ type: 'CLEAR_ACTIVE_ITEM' }) // Clear active tile  
  }

  // ---------------------------------------------------------------------------
  //------ useEffect: auto-reset on home route  
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch({ type: 'CLEAR_ACTIVE_ITEM' }) // Clear on homepage  
    }
  }, [location.pathname, dispatch]) // Run when route changes  

  // ---------------------------------------------------------------------------
  //------ Return API  
  // ---------------------------------------------------------------------------
  return { $isActive, handleClick, handleNavigate, handleClose } // Expose tile control  
}
