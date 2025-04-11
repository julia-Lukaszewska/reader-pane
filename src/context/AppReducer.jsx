// -----------------------------------------------------------------------------
//------ AppReducer  
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
//------ Initial state  
// -----------------------------------------------------------------------------

export const initialState = {
  theme: 'light', // Default theme is light  
  activeItem: null, // Currently active item (e.g., book, tile)  
  library: [], // List of uploaded books  
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

    case 'SET_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload, // Set clicked item as active  
      }

    case 'CLEAR_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: null, // Clear active item on navigation  
      }

    case 'SET_LIBRARY':
      return {
        ...state,
        library: action.payload, // Replace full library list  
      }

    case 'ADD_BOOK':
      return {
        ...state,
        library: [...state.library, action.payload], // Add new book to library  
      }

    case 'ARCHIVE_BOOK':
      return {
        ...state,
        library: state.library.map((book) =>
          book._id === action.payload ? { ...book, isDeleted: true } : book
        ),
      } // Mark book as deleted  

    case 'REMOVE_BOOK':
      return {
        ...state,
        library: state.library.filter((book) => book._id !== action.payload),
      } // Remove book from library  

    case 'RESTORE_BOOK':
      return {
        ...state,
        library: state.library.map((book) =>
          book._id === action.payload ? { ...book, isDeleted: false } : book
        ),
      } // Restore deleted book  

    default:
      return state // Return unchanged state if action type is unknown  
  }
}
