// src/store/index.js
/**
 * @file index.js
 * @description
 * Configures Redux store with RTK Query APIs, persistence, and middleware.
 * Persists only UI and data slices, excluding auth state for security.
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

import   {externalApi}  from './api/externalApi'
import { authApi } from './api/authApi/authApi'
import { pdfStreamApi } from './api/pdfStreamApi'
import {booksApi} from './api/booksPrivateApi'
import bookReducer from './slices/bookSlice'
import readerReducer from './slices/readerSlice'
import pdfCacheReducer from './slices/pdfCacheSlice'
import mainUiReducer from './slices/mainUiSlice'
import authReducer from './slices/authSlice'

//----------------------------------------------------------------------------- 
// Persistence Configurations
//-----------------------------------------------------------------------------  

/**
 * Persistence configuration for book slice (UI only)
 */
const bookPersistConfig = {
  key: 'book',
  storage,
  whitelist: [
    'activeBookId',
    'previewBookId',
    'libraryViewMode',
    'sortMode',
    'selectedIds',
    'progressMode',
    'lastOpenedBookId',
  ],
}

/**
 * Persistence configuration for reader slice
 */
const readerPersistConfig = {
  key: 'reader',
  storage,
  whitelist: ['scaleIndex', 'pageViewMode'],
}

/**
 * Global persistence configuration
 * Only UI and cached data slices are persisted. Auth state is not persisted.
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'book',
    'reader',
    'mainUi',
 
  ],
}

//----------------------------------------------------------------------------- 
// Root Reducer
//-----------------------------------------------------------------------------  

const rootReducer = combineReducers({
  ui: mainUiReducer,
  book: persistReducer(bookPersistConfig, bookReducer),
  reader: persistReducer(readerPersistConfig, readerReducer),
  pdfCache: pdfCacheReducer,
  auth: authReducer, // auth state remains in memory, not persisted
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
    },
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
