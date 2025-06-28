/**
 * @file index.js
 * @description
 * Configures Redux store with RTK Query APIs, state persistence, and middleware.
 * Only UI and data slices are persisted. Auth state is excluded for security.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import expireIn from 'redux-persist-transform-expire-in'

//-----------------------------------------------------------------------------
// API Slices
//-----------------------------------------------------------------------------

import { booksApi } from './api/booksPrivateApi'
import { externalApi } from './api/externalApi'
import { authApi } from './api/authApi/authApi'
import { pdfStreamApi } from './api/pdfStreamApi'

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------

import bookReducer from './slices/bookSlice'
import readerReducer from './slices/readerSlice'
import mainUiReducer from './slices/mainUiSlice'
import authReducer from './slices/authSlice'
import streamReducer from './slices/streamSlice'
import bookModalReducer from './slices/bookModalSlice'

//-----------------------------------------------------------------------------
// Persistence Configurations
//-----------------------------------------------------------------------------

/**
 * Persist selected fields from the book UI slice.
 */
const bookPersistConfig = {
  key: 'book',
  storage,
  whitelist: [
   
    'searchQuery',
    'libraryViewMode',
    'sortMode',
    'selectedIds',
    'progressMode',
    'lastOpenedBookId',
  ],
}

/**
 * Persist selected reader-related state (zoom and view mode).
 */
const readerPersistConfig = {
  key: 'reader',
  storage,
  whitelist: ['scaleIndex'],
}

/**
 * Root persistence configuration (only UI/data slices).
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['book', 'reader', 'mainUi', booksApi.reducerPath],
  transforms: [expireIn(24 * 60 * 60 * 1000, 'libraryCacheExpiration')],
}

//-----------------------------------------------------------------------------
// Root Reducer
//-----------------------------------------------------------------------------

const rootReducer = combineReducers({
  ui: mainUiReducer,
  book: persistReducer(bookPersistConfig, bookReducer),
  reader: persistReducer(readerPersistConfig, readerReducer),
  auth: authReducer, // auth is kept in memory only
  stream: streamReducer,
   bookModal: bookModalReducer,
  [booksApi.reducerPath]: booksApi.reducer,
  [externalApi.reducerPath]: externalApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [pdfStreamApi.reducerPath]: pdfStreamApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

//-----------------------------------------------------------------------------
// Middleware
//-----------------------------------------------------------------------------

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredPaths: ['reader.visiblePages', 'pdfStreamApi'],
      isSerializable: value => {
        if (value instanceof Blob) return true
        if (value === null) return true
        const type = typeof value
        return (
          type === 'undefined' ||
          type === 'string' ||
          type === 'number' ||
          type === 'boolean' ||
          Array.isArray(value) ||
          Object.getPrototypeOf(value) === Object.prototype
        )
      }
    }
  }).concat(
    booksApi.middleware,
    externalApi.middleware,
    authApi.middleware,
    pdfStreamApi.middleware
  )

//-----------------------------------------------------------------------------
// Store Configuration
//-----------------------------------------------------------------------------

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export * from './api'
export * from './slices'
export * from './selectors'
export default store
