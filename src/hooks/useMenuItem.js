//-----------------------------------------------------------------------------
// useMenuItem: hook for handling menu tile behavior
//-----------------------------------------------------------------------------

import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveItem, clearActiveItem } from '@/store/slices/mainUiSlice'

const useMenuItem = (name, route) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const activeItem = useSelector((state) => state.ui.activeItem)
  const $isActive = activeItem === name

  const handleClick = () => {
    if (activeItem && !$isActive) return
    if (!$isActive) dispatch(setActiveItem(name))
  }

  const handleNavigate = (e) => {
    e.stopPropagation()
    navigate(route)
  }

  const handleClose = (e) => {
    e?.stopPropagation()
    dispatch(clearActiveItem())
  }

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(clearActiveItem())
    }
  }, [location.pathname, dispatch])

  return { $isActive, handleClick, handleNavigate, handleClose }
}

export default useMenuItem
