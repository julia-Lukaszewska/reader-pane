//-----------------------------------------------------------------------------
//------ useMobileViewMode: Force single-page mode on small screens 
//-----------------------------------------------------------------------------

import { useEffect } from 'react' // React effect hook 
import { useDispatch } from 'react-redux' // Redux dispatch hook 
import { setViewMode } from '@/store' // Redux action to set view mode 

const useMobileViewMode = () => {
  // const hook declaration 
  const dispatch = useDispatch() // Get Redux dispatch 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth // Get viewport width 
      if (width < 768) {
        dispatch(setViewMode('single')) // Force single view 
      }
    }

    handleResize() // Initial check 
    window.addEventListener('resize', handleResize) // Listen for resize 
    return () => window.removeEventListener('resize', handleResize) // Cleanup listener 
  }, [dispatch]) // Run on mount and when dispatch changes 
}

export default useMobileViewMode // Export hook 
