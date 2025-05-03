// -----------------------------------------------------------------------------
//------ IMPORTS 
// -----------------------------------------------------------------------------
import { useDispatch, useSelector } from 'react-redux'  
import { moveToTrash, deleteBookForever } from '@/api' 
import { archiveBookThunk, removeBook } from '@/store'  

// -----------------------------------------------------------------------------
//------ useManageBookActions hook 
// -----------------------------------------------------------------------------
const useManageBookActions = (bookId) => {
  const dispatch = useDispatch() 

   
  const books = useSelector((state) => state.library.list ?? [])
  
  const book = books.find((b) => b._id === bookId)
  const isArchived = book?.archived ?? false 

  
  const onArchive = async (e) => {
    e?.stopPropagation() 
    await moveToTrash(bookId)  
    dispatch(archiveBookThunk(bookId)) 
  }

  // Handler to delete book forever 
  const onDelete = async (e) => {
    e?.stopPropagation() // prevent parent click 
    await deleteBookForever(bookId) // API call 
    dispatch(removeBook(bookId)) // update Redux 
  }

  return {
    action: isArchived ? onDelete : onArchive, 
    isArchived, 
  }
}

export default useManageBookActions 
