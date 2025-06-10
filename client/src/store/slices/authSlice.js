/**
 * @file authSlice.js
 * @description
 * Redux slice for managing JWT access token after login and token refresh.
 * Provides actions to store and clear token used in authenticated requests,
* and flag when auth check is complete.

 */

import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '@/store/api/authApi'

//----------------------------------------------------------------------------- 
// Initial State
//-----------------------------------------------------------------------------  
const initialState = {
  access: null,
  authChecked: false,
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
     * Sets the authChecked flag based on payload.
     * @param {boolean} action.payload
     */
    setAuthChecked(state, action) {
      state.authChecked = action.payload
    },
    /**
     * Marks authChecked as true.
     */
    markAuthChecked(state) {
      state.authChecked = true
    },
    /**
     * Resets auth state completely (for testing or full logout).
     */
    resetAuth(state) {
      state.access = null
      state.authChecked = false
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.access = payload.access
          state.authChecked = true
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.access = payload.access
          state.authChecked = true
        }
      )
      .addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.access = payload.access
        }
      )
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        state => {
          state.access = null
          state.authChecked = true
        }
      )
  },
})

//----------------------------------------------------------------------------- 
// Exports
//-----------------------------------------------------------------------------  
export const {
  setCredentials,
  clearCredentials,
  setAuthChecked,
  markAuthChecked,
  resetAuth,         
} = authSlice.actions

export default authSlice.reducer
