import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  getBooks,
  archiveBook,
  restoreBook,
  favoriteBook,
  unfavoriteBook,
  deleteBookForever,
} from '@/api'

//--------------------------------------------------
//------ Fetch books from API 
//--------------------------------------------------
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      return await getBooks()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
//-----------------------------------------------------------------------------
//------ Archive book 
//-----------------------------------------------------------------------------
export const archiveBookThunk = createAsyncThunk(
  'books/archive',
  async (id, { rejectWithValue }) => {
    try {
      return await archiveBook(id)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
//-----------------------------------------------------------------------------
//------ Restore book 
//-----------------------------------------------------------------------------

export const restoreBookThunk = createAsyncThunk(
  'books/restore',
  async (id, { rejectWithValue }) => {
    try {
      const response = await restoreBook(id) // ← to prawdopodobnie axios
      return response.data // ✅ tylko dane książki, bez headers
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

//-----------------------------------------------------------------------------
//------ Favorite book 
//-----------------------------------------------------------------------------
export const favoriteBookThunk = createAsyncThunk(
  'books/favorite',
  async (id, { rejectWithValue }) => {
    try {
      const response = await favoriteBook(id) // ← to prawdopodobnie axios
      return response.data // ✅ tylko dane książki, bez headers
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
//-----------------------------------------------------------------------------
//------ Unfavorite book 
//-----------------------------------------------------------------------------
export const unfavoriteBookThunk = createAsyncThunk(
  'books/unfavorite',
  async (id, { rejectWithValue }) => {
    try {
      const response = await unfavoriteBook(id) // ← to prawdopodobnie axios
      return response.data // ✅ tylko dane książki, bez headers
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
//-----------------------------------------------------------------------------
//------ Delete book forever 
//-----------------------------------------------------------------------------
export const deleteBookForeverThunk = createAsyncThunk(
  'books/deleteBookForever',
  async (id, { rejectWithValue }) => {
    try {
      await deleteBookForever(id)
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
