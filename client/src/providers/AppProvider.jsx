/**
 * @file AppProvider.jsx
 * @description Wraps the application with Redux Provider, PersistGate, and global styles.
 */

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import  GlobalStyles  from '@/styles/GlobalStyles.jsx'

//-----------------------------------------------------------------------------
// Component: AppProvider
//-----------------------------------------------------------------------------

/**   
 * Provides Redux store context, state persistence via redux-persist,
 * and injects global styles for the app.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element}
 */
export default function AppProvider({ children }) {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        {children}
      </PersistGate>
    </Provider>
  )
}
