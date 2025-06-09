/**
 * @file authSlice.js
 * @description
 * Redux slice for managing JWT access token after login and token refresh.
 * Provides actions to store and clear token used in authenticated requests,
 * and flags app startup readiness.
 */

import { createSlice } from '@reduxjs/toolkit'

//----------------------------------------------------------------------------- 
// Initial State
//-----------------------------------------------------------------------------  

/**
 * @type {{ access: string | null, startupReady: boolean }}
 * Stores JWT access token after login
 */
const initialState = {
  access: null,
  startupReady: false,
}

//----------------------------------------------------------------------------- 
// Slice Definition
//-----------------------------------------------------------------------------  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets the access token received from backend.
     * Used after login or token refresh.
     */
    setCredentials(state, action) {
      state.access = action.payload.access
    },

    /**
     * Clears the stored access token.
     * Used on logout or token refresh failure.
     */
    clearCredentials(state) {
      state.access = null
    },

    /**
     * Sets the startupReady flag based on payload.
     * @param {Object} state
     * @param {{ payload: boolean }} action
     */
    setStartupReady(state, action) {
      state.startupReady = action.payload
    },

    /**
     * Marks startupReady as true.
     */
    markStartupReady(state) {
      state.startupReady = true
    },
  },
  extraReducers: builder => {
    // Add RTK Query or other thunk reducers here, e.g.: 
    // builder.addCase(refreshToken.fulfilled, (state, action) => {
    //   state.access = action.payload.access
    // })
  }
})

//----------------------------------------------------------------------------- 
// Exports
//-----------------------------------------------------------------------------  

export const {
  setCredentials,
  clearCredentials,
  setStartupReady,
  markStartupReady
} = authSlice.actions

export default authSlice.reducer
