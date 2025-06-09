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
import { authApi } from './api/authApi'
import { pdfStreamApi } from './api/pdfStreamApi'

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
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'book', 'reader', 'mainUi', booksApi.reducerPath, pdfStreamApi.reducerPath],
}

//----------------------------------------------------------------------------- 
// Root Reducer
//-----------------------------------------------------------------------------  

const rootReducer = combineReducers({
  ui: mainUiReducer,
  book: persistReducer(bookPersistConfig, bookReducer),
  reader: persistReducer(readerPersistConfig, readerReducer),
  pdfCache: pdfCacheReducer,
  auth: authReducer,
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
export * from './selectors/selectors'
export default store
