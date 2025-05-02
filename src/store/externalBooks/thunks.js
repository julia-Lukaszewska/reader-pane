import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchExternalBooks } from '@/api'
//------------------------------------------------------------------------------
//------ Fetch external books from Wolne Lektury API 
//------------------------------------------------------------------------------
export const fetchExternalBooksThunk = createAsyncThunk(
  'externalBooks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchExternalBooks()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
