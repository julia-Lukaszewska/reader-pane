import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './books/slice'
import externalBooksReducer from './externalBooks/slice'
import uploadReducer from './upload/slice'
import readerReducer from './reader/slice'
import uiReducer from './ui/slice'

//------------------------------------------------------------------------------
//------ Main store configuration 
//------------------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    library: booksReducer,
    externalBooks: externalBooksReducer,
    upload: uploadReducer,
    reader: readerReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
})

//------------------------------------------------------------------------------
//------ Main barrel export 
//------------------------------------------------------------------------------
export * from './books'
export * from './externalBooks'
export * from './upload'
export * from './reader'
export * from './ui'

export default store
