import { createAsyncThunk } from '@reduxjs/toolkit'
import { uploadBook } from '@/api'
import { validatePDF, countPDFPages } from '@/utils'
import { setActiveBook } from '../reader'
import { fetchBooks } from '../books'
//------------------------------------------------------------------------------
//------ Async thunk – upload PDF book file 
//------------------------------------------------------------------------------
export const uploadBookThunk = createAsyncThunk(
  'upload/book',
  async (file, { dispatch, rejectWithValue }) => {
    try {
      if (!validatePDF(file))
        throw new Error('The selected file is not a valid PDF.')
      const totalPages = await countPDFPages(file)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('totalPages', totalPages.toString())

      const response = await uploadBook(formData)

      dispatch(setActiveBook(response))
      dispatch(fetchBooks())
      return response
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
