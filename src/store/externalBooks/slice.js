import { createSlice } from '@reduxjs/toolkit'
import { fetchExternalBooksThunk } from './thunks'
//------------------------------------------------------------------------------
//------ Slice for external books 
//------------------------------------------------------------------------------
const initialState = {
  list: [],
  status: 'idle',
  error: null,
  isImporting: false,
}
//------------------------------------------------------------------------------
//------ Slice 
//------------------------------------------------------------------------------
const externalBooksSlice = createSlice({
  name: 'externalBooks',
  initialState,
  reducers: {
    // Action to set the importing state 
    setIsImporting(state, action) {
      state.isImporting = action.payload
    },
    // Action to clear the list of external books 
    clearExternalBooks(state) {
      state.list = []
    },
  },
  //------------------------------------------------------------------------------
  //------ Extra reducers for handling async actions 
  //------------------------------------------------------------------------------
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the fetchExternalBooksThunk 
      .addCase(fetchExternalBooksThunk.pending, (state) => {
        state.status = 'loading'
      })
      // Handle the fulfilled state of the fetchExternalBooksThunk 
      .addCase(fetchExternalBooksThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      // Handle the rejected state of the fetchExternalBooksThunk 
      .addCase(fetchExternalBooksThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setIsImporting, clearExternalBooks } = externalBooksSlice.actions
export default externalBooksSlice.reducer
