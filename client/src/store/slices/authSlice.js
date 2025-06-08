/**
 * @file authSlice.js
 * @description
 * Redux slice for managing JWT access token after login and token refresh.
 * Provides actions to store and clear token used in authenticated requests.
 */

import { createSlice } from '@reduxjs/toolkit'

//----------------------------------------------------------------------------- 
// Initial State
//-----------------------------------------------------------------------------  

/**
 * @type {{ access: string | null }}
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
     *
     * @param {Object} state
     * @param {{ payload: { access: string } }} action
     */
    setCredentials(state, action) {
      state.access = action.payload.access
    },

    /**
     * Clears the stored access token.
     * Used on logout or token refresh failure.
     *
     * @param {Object} state
     */
    clearCredentials(state) {
      state.access = null
    },
  },
  setStartupReady(state, action) {
  state.startupReady = action.payload
},

markStartupReady(state) {
  state.startupReady = true
},

})

//----------------------------------------------------------------------------- 
// Exports
//-----------------------------------------------------------------------------  

export const { setCredentials, clearCredentials,  setStartupReady, markStartupReady} = authSlice.actions
export default authSlice.reducer