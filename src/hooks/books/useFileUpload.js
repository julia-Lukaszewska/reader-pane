// src/hooks/books/useFileUpload.js
import { useDispatch } from 'react-redux'
import { uploadBookThunk } from '@/store'
const useFileUpload = () => {
  const dispatch = useDispatch()
  const upload = (file) => dispatch(uploadBookThunk(file)).unwrap()
  return { upload }
}

export default useFileUpload
