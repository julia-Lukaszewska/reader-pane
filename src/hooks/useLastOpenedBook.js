import { useEffect } from 'react'
import { getLastBookId } from '../utils/storage' // Utility to get last opened book from localStorage  

/**
 * Redirects to the last opened book if no book ID is present in route.
 * If no saved ID exists, navigates to homepage.
 *
 * @param {string | undefined} routeBookId - Book ID from the route (e.g. /read/:id)
 * @param {function} navigate - Navigation function from react-router
 */
export function useLastOpenedBook(routeBookId, navigate) {
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
