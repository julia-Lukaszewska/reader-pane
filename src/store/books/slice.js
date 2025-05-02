import { createSlice } from '@reduxjs/toolkit'
import {
  fetchBooks,
  archiveBookThunk,
  restoreBookThunk,
  favoriteBookThunk,
  unfavoriteBookThunk,
  deleteBookForeverThunk,
} from './thunks'

//-----------------------------------------------------------------------------
//------------- Initial state and reducer for library slice 
//-----------------------------------------------------------------------------
const initialState = {
  list: [],
  libraryViewMode: 'grid',
  sortMode: '',
  status: 'idle',
  error: null,
  isManaging: false,
  selectedBooks: [],
}
//-----------------------------------------------------------------------------
//------------- Helper function to replace a book in the list 
//-----------------------------------------------------------------------------
const replace = (state, action) => {
  const updated = action.payload
  const idx = state.list.findIndex((b) => b._id === updated._id)
  if (idx !== -1) state.list[idx] = updated
}
//-----------------------------------------------------------------------------
//------------- Slice for library management 
//-----------------------------------------------------------------------------
const booksSlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // Function to toggle the managing state of the library 
    toggleManaging(state) {
      state.isManaging = !state.isManaging
      if (!state.isManaging) state.selectedBooks = []
    },
    // Function to select a book by its ID and toggle its selection state 
    selectBook(state, action) {
      const id = action.payload
      state.selectedBooks = state.selectedBooks.includes(id)
        ? state.selectedBooks.filter((i) => i !== id)
        : [...state.selectedBooks, id]
    },
    // Function to clear all selected books 
    clearSelectedBooks(state) {
      state.selectedBooks = []
    },
    // Function to set the library view mode (grid or list) 
    setLibraryViewMode(state, action) {
      state.libraryViewMode = action.payload
    },
    // Function to set the sorting mode for books (e.g., by title, author) 
    setSortMode(state, action) {
      state.sortMode = action.payload
    },
    // Function to update a book's details in the list 
    updateBook(state, action) {
      const { _id, changes } = action.payload
      const idx = state.list.findIndex((b) => b._id === _id)
      if (idx !== -1) {
        state.list[idx] = { ...state.list[idx], ...changes }
      }
    },
    // Function to remove a book from the list by its ID 
    removeBook(state, action) {
      const id = action.payload
      state.list = state.list.filter((b) => b._id !== id)
    },
  },

  // Function to sort books based on the selected sorting mode 
  extraReducers: (builder) => {
    builder
      // Fetch books from the server and update the state 
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
      })
      // When books are fetched successfully, update the state with the list of books 
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'idle'
        state.list = action.payload
      })
      // If fetching books fails, update the state with the error message 
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handle various actions related to books, such as archiving, restoring, favoriting, and deleting 
      .addCase(archiveBookThunk.fulfilled, replace)
      // Restore a book from the archive 
      .addCase(restoreBookThunk.fulfilled, replace)
      // Favorite a book 
      .addCase(favoriteBookThunk.fulfilled, replace)
      // Unfavorite a book 
      .addCase(unfavoriteBookThunk.fulfilled, replace)
      // Delete a book forever from the library 
      .addCase(deleteBookForeverThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((b) => b._id !== action.payload)
      })
  },
})
//-----------------------------------------------------------------------------
//------------- Exporting actions and reducer for the library slice 
//-----------------------------------------------------------------------------
export const {
  toggleManaging,
  selectBook,
  clearSelectedBooks,
  setLibraryViewMode,
  setSortMode,
  updateBook,
  removeBook,
} = booksSlice.actions

export default booksSlice.reducer
