// src/store/index.js

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
import storage from 'redux-persist/lib/storage' // uses localStorage

import { booksApi, externalApi } from './api'
import bookReducer from './slices/bookSlice'
import readerReducer from './slices/readerSlice'
import pdfCacheReducer from './slices/pdfCacheSlice'
import mainUiReducer from './slices/mainUiSlice'

//------------------------------------------------------------------------------
// Persistence configuration – book state
//------------------------------------------------------------------------------

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
  ],
}

//------------------------------------------------------------------------------
// Persistence configuration – reader state
//------------------------------------------------------------------------------

const readerPersistConfig = {
  key: 'reader',
  storage,
  whitelist: [
    'pagesByBook',
    'scaleIndex',
    'pageViewMode',
  ],
}

//------------------------------------------------------------------------------
// Root reducer
//------------------------------------------------------------------------------

const rootReducer = combineReducers({
  ui: mainUiReducer,
  book: persistReducer(bookPersistConfig, bookReducer),
  reader: persistReducer(readerPersistConfig, readerReducer),
  pdfCache: pdfCacheReducer,

  // RTK Query
  [booksApi.reducerPath]: booksApi.reducer,
  [externalApi.reducerPath]: externalApi.reducer,
})

//------------------------------------------------------------------------------
// Global persist config (optional root wrapper)
//------------------------------------------------------------------------------

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['book', 'reader'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//------------------------------------------------------------------------------
// Middleware configuration
//------------------------------------------------------------------------------

const middleware = (getDefault) =>
  getDefault({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(
    booksApi.middleware,
    externalApi.middleware
  )

//------------------------------------------------------------------------------
// Store configuration
//------------------------------------------------------------------------------

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: import.meta.env.MODE !== 'production',
})

export const persistor = persistStore(store)

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

export * from './api'
export * from './slices'
export * from './selectors'
export default store
