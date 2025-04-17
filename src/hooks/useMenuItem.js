// -----------------------------------------------------------------------------
//------ useMenuItem: Custom hook to control menu tile behavior  
// -----------------------------------------------------------------------------

import { useEffect, useContext } from 'react' // React hook for side effects  
import { useNavigate, useLocation } from 'react-router-dom' // Routing hooks  
import { AppContext } from '../context/AppContext' // App-wide context state  

/**
 * Hook for managing interaction logic for a single menu tile.
 * Handles activation, navigation, and deactivation states.
 * Also resets state when user navigates to home route.
 */
export const useMenuItem = (name, route) => {
  const navigate = useNavigate()  
  const location = useLocation()  
  const { state, dispatch } = useContext(AppContext)  

  const $isActive = state.activeItem === name  

  /**
   * Activate this tile if it's not already active.
   * Prevents multiple tiles from being activated.
   */
  const handleClick = () => {
    if (state.activeItem && !$isActive) return
    if (!$isActive) {
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: name })  
    }
  }

  /**
   * Navigate to the tile's assigned route.
   * Stops event bubbling to avoid triggering parent handlers.
   */
  const handleNavigate = (e) => {
    e.stopPropagation()  
    navigate(route)  
  }

  /**
   * Deactivate this tile (clears state).
   * Optional event param allows usage inside click handlers.
   */
  const handleClose = (e) => {
    if (e?.stopPropagation) e.stopPropagation()  
    dispatch({ type: 'CLEAR_ACTIVE_ITEM' })  
  }

  /**
   * Automatically reset active item when navigating to home (/).
   * Ensures clean state when returning to main screen.
   */
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch({ type: 'CLEAR_ACTIVE_ITEM' })  
    }
  }, [location.pathname, dispatch])

  return {
    $isActive, // Boolean: is this tile active?  
    handleClick, // Function: activate this tile  
    handleNavigate, // Function: go to assigned route  
    handleClose, // Function: deactivate tile  
  }
}
