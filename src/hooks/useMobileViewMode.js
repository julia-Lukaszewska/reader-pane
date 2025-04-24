//-----------------------------------------------------------------------------
//------ useMobileViewMode: Force single-page mode on small screens  
//-----------------------------------------------------------------------------

import { useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const useMobileViewMode = () => {
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 768) {
        dispatch({ type: 'SET_VIEW_MODE', payload: 'single' })  
      }
    }

    handleResize()  

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch])
}
