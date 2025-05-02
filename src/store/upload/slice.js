import { createSlice } from '@reduxjs/toolkit'
import { uploadBookThunk } from './thunks'
//------------------------------------------------------------------------------
//------ Upload Slice 
//------------------------------------------------------------------------------

//--------------------------------------------------
//------ Initial State 
//--------------------------------------------------
const initialState = {
  status: 'idle',
  error: null,
}
//------------------------------------------------------------------------------
//------ Slice uploadu PDF 
//------------------------------------------------------------------------------
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: ,
  //------------------------------------------------------------------------------
  //------ Extra reducers for handling async actions 
  //------------------------------------------------------------------------------
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the uploadBookThunk 
      .addCase(uploadBookThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      // Handle the fulfilled state of the uploadBookThunk 
      .addCase(uploadBookThunk.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      // Handle the rejected state of the uploadBookThunk 
      .addCase(uploadBookThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default uploadSlice.reducer
