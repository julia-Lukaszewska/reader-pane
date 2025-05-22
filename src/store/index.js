/**
 * @file index.js
 * @description Configures and exports the Redux store with persistence and RTK Query middleware.
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

import { booksApi, externalApi } from './api'
import bookReducer from './slices/bookSlice'
import readerReducer from './slices/readerSlice'
import pdfCacheReducer from './slices/pdfCacheSlice'
import mainUiReducer from './slices/mainUiSlice'

//-----------------------------------------------------------------------------
// Persistence Configurations
//-----------------------------------------------------------------------------  

/**
 * Persistence configuration for book slice
 */
const bookPersistConfig = {
  key: 'book',
  storage,
  whitelist: [
    'byId',
    'activeBookId',
    'previewBookId',
    'libraryViewMode',
    'sortMode',
    'selectedIds',
    'progressMode',
  ],
}

/**
 * Persistence configuration for reader slice
 */
const readerPersistConfig = {
  key: 'reader',
  storage,
  whitelist: [
    'scaleIndex',
    'pageViewMode',
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
  [booksApi.reducerPath]: booksApi.reducer,
  [externalApi.reducerPath]: externalApi.reducer,
})

//-----------------------------------------------------------------------------
// Global Persist Config
//-----------------------------------------------------------------------------  

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['book', 'reader'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//-----------------------------------------------------------------------------
// Middleware
//-----------------------------------------------------------------------------  

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(
    booksApi.middleware,
    externalApi.middleware
  )

//-----------------------------------------------------------------------------
// Store Configuration
//-----------------------------------------------------------------------------  

/**
 * The Redux store with persistence and middleware set up
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

/**
 * Persistor for persisting store
 */
export const persistor = persistStore(store)

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------  

export * from './api'
export * from './slices'
export * from './selectors'
export default store
