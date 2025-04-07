// -----------------------------------------------------------------------------
//------ AppReducer  
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//------ Initial state  
// -----------------------------------------------------------------------------

export const initialState = {
  theme: 'light', // Default theme is light  
}

// -----------------------------------------------------------------------------
//------ Reducer function  
// -----------------------------------------------------------------------------

export function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      // Toggle between light and dark theme  
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }

    default:
      // Return current state if action is unknown  
      return state
  }
}
