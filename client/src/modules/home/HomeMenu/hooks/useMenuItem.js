/**
 * @file useMenuItem.js
 * @description Hook for handling the logic of interactive menu tiles. 
 * Controls active tile state, navigation and cleanup on route change.
 *
 * @param {string} name - Unique name of the tile
 * @param {string} route - Route to navigate to on tile click
 * @returns {{
 *   $isActive: boolean,
 *   handleClick: Function,
 *   handleNavigate: Function,
 *   handleClose: Function
 * }}
 */

//-----------------------------------------------------
//------ Imports
//-----------------------------------------------------

import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveItem, clearActiveItem } from '@/store/slices/mainUiSlice'

//-----------------------------------------------------
//------ Hook: useMenuItem
//-----------------------------------------------------

/**
 * @function useMenuItem
 * @description Custom hook that controls interactive tile state and navigation logic.
 *
 * @param {string} name - Unique tile identifier
 * @param {string} route - Route to navigate to
 * @returns {Object} Result
 * @returns {boolean} Result.$isActive - Whether the tile is active
 * @returns {Function} Result.handleClick - Activates the tile
 * @returns {Function} Result.handleNavigate - Navigates to the route
 * @returns {Function} Result.handleClose - Deactivates the tile
 */
const useMenuItem = (name, route) => {
  //-----------------------------------------------------
  //--- Hooks and State
  //-----------------------------------------------------
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const activeItem = useSelector((state) => state.ui.activeItem)
  const $isActive = activeItem === name

  //-----------------------------------------------------
  //--- Handlers
  //-----------------------------------------------------

  //--- Activate tile
  const handleClick = () => {
    if (activeItem && !$isActive) return
    if (!$isActive) dispatch(setActiveItem(name))
  }

  //--- Navigate to route
  const handleNavigate = (e) => {
    e.stopPropagation()
    navigate(route)
  }

  //--- Deactivate tile
  const handleClose = (e) => {
    e?.stopPropagation()
    dispatch(clearActiveItem())
  }

  //-----------------------------------------------------
  //--- Cleanup on route change
  //-----------------------------------------------------

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(clearActiveItem())
    }
  }, [location.pathname, dispatch])

  //-----------------------------------------------------
  //--- Return 
  //-----------------------------------------------------

  return { $isActive, handleClick, handleNavigate, handleClose }
}

export default useMenuItem
