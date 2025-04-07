// -----------------------------------------------------------------------------
//------ AppProvider Component   
// -----------------------------------------------------------------------------

import { useEffect, useReducer } from 'react' // useReducer and useEffect hooks  
import { appReducer, initialState } from './AppReducer' // Reducer and initial state  
import { AppContext } from './AppContext' // Context object  

// -----------------------------------------------------------------------------
//------ AppProvider   
// -----------------------------------------------------------------------------

export const AppProvider = ({ children }) => {
  // useReducer to manage global state  
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Set theme on body element based on state  
    document.body.setAttribute('data-theme', state.theme)
  }, [state.theme])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {/* Provides state and dispatch via context   */}
      {children}
    </AppContext.Provider>
  )
}

// -----------------------------------------------------------------------------
//------ Export AppProvider  
// -----------------------------------------------------------------------------
