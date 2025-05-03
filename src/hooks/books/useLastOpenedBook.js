//-----------------------------------------------------------------------------
//------ useLastOpenedBook: Redirects to last opened book if no route ID 
//-----------------------------------------------------------------------------

import { useEffect } from 'react'  
import { getLastBookId } from '@/utils' 

const useLastOpenedBook = (routeBookId, navigate) => {
   
  useEffect(() => {
    if (!routeBookId) {
      
      const lastBookId = getLastBookId()  

      if (lastBookId) {
        navigate(`/read/${lastBookId}`, { replace: true })  
      } else {
        navigate('/', { replace: true })  
      }
    }
  }, [routeBookId, navigate])  
}

export default useLastOpenedBook 
