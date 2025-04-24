//-----------------------------------------------------------------------------
//------ initialState: shape of the global store  
//-----------------------------------------------------------------------------

export const initialState = {
  // App settings  
  theme: 'light', // Default theme is light  
  activeItem: null, // Currently active sidebar item  

  // Library  
  library: [], // Starts empty – user will add books  

  // Active book  
  activeBook: null, // Full book object or null  
  viewMode: 'single', // Display mode – single or two‑page  
  currentPage: 1, // Currently visible page number  
  isSidebarOpen: false, // Whether the sidebar is open  

  // Rendered PDF pages cache  
  renderedPages: {}, // Canvas pages grouped by scale  
  renderedRanges: {}, // Ranges (from–to) already rendered  

  // Zoom & pagination  
  scaleLevels: [1, 1.25, 1.5, 1.75, 2], // Allowed zoom levels  
  scaleIndex: 0, // Index of current zoom; 0 = 1×  
  batchSize: 20, // How many pages to render per batch  
  safetyOffset: 2, // Preload when 2 pages before batch end  
}

//-----------------------------------------------------------------------------
//------ appReducer: handles every dispatched action  
//-----------------------------------------------------------------------------

export function appReducer(state, action) {
  switch (action.type) {
    //-----------------------------------------------------------------------------
    //------ Theme/UI  
    //-----------------------------------------------------------------------------

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }

    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen }

    case 'SET_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: action.payload, // true or false  
      }

    case 'SET_ACTIVE_ITEM':
      return { ...state, activeItem: action.payload }

    case 'CLEAR_ACTIVE_ITEM':
      return { ...state, activeItem: null }

    //-----------------------------------------------------------------------------
    //------ Library actions  
    //-----------------------------------------------------------------------------

    case 'SET_LIBRARY':
      return { ...state, library: action.payload }

    case 'ADD_BOOK':
      return { ...state, library: [...state.library, action.payload] }

    case 'REMOVE_BOOK':
      return {
        ...state,
        library: state.library.filter((book) => book._id !== action.payload),
      }

    case 'ARCHIVE_BOOK':
      return {
        ...state,
        library: state.library.map((book) =>
          book._id === action.payload ? { ...book, isDeleted: true } : book
        ),
      }

    case 'RESTORE_BOOK':
      return {
        ...state,
        library: state.library.map((book) =>
          book._id === action.payload ? { ...book, isDeleted: false } : book
        ),
      }

    //-----------------------------------------------------------------------------
    //------ Active book info  
    //-----------------------------------------------------------------------------

    case 'SET_ACTIVE_BOOK': {
      const { progress = 1, totalPages } = action.payload
      const clampedPage =
        typeof totalPages === 'number'
          ? Math.min(Math.max(progress, 1), totalPages)
          : progress
      return {
        ...state,
        activeBook: action.payload,
        currentPage: clampedPage,
      }
    }

    case 'UPDATE_BOOK':
      return {
        ...state,
        library: state.library.map((book) =>
          book._id === action.payload._id
            ? { ...book, ...action.payload }
            : book
        ),
      }

    case 'CLEAR_ACTIVE_BOOK':
      return { ...state, activeBook: null }

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }

    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }

    case 'SET_LIBRARY_VIEW_MODE':
      return { ...state, libraryViewMode: action.payload }

    //-----------------------------------------------------------------------------
    //------ Zoom & preload settings  
    //-----------------------------------------------------------------------------

    case 'SET_SCALE_INDEX':
      return { ...state, scaleIndex: action.payload }

    case 'SET_BATCH_SIZE':
      return { ...state, batchSize: action.payload }

    case 'SET_SAFETY_OFFSET':
      return { ...state, safetyOffset: action.payload }

    //-----------------------------------------------------------------------------
    //------ Render cache  
    //-----------------------------------------------------------------------------

    case 'ADD_RENDERED_PAGES': {
      const { scale, pages } = action.payload
      const updated = { ...state.renderedPages[scale], ...pages }
      return {
        ...state,
        renderedPages: { ...state.renderedPages, [scale]: updated },
      }
    }

    case 'SET_RENDERED_RANGE': {
      const { scale, range } = action.payload
      const prevRanges = state.renderedRanges[scale] || []
      const nextRanges = [...prevRanges, range].slice(-2) // keep last 2  
      return {
        ...state,
        renderedRanges: { ...state.renderedRanges, [scale]: nextRanges },
      }
    }

    case 'TRIM_OLD_PAGES': {
      const { scale } = action.payload
      const ranges = state.renderedRanges[scale] || []
      const pages = state.renderedPages[scale] || {}
      const keepFrom = ranges[0]?.from || 0
      const trimmed = Object.fromEntries(
        Object.entries(pages).filter(([key]) => Number(key) >= keepFrom)
      )
      return {
        ...state,
        renderedPages: { ...state.renderedPages, [scale]: trimmed },
      }
    }

    case 'TRIM_AROUND_CURRENT_PAGE': {
      const { currentPage, range } = action.payload
      const updatedPages = {}
      Object.entries(state.renderedPages).forEach(([scale, pages]) => {
        const kept = {}
        for (let i = currentPage - range; i <= currentPage + range; i++) {
          if (pages[i]) kept[i] = pages[i]
        }
        updatedPages[scale] = kept
      })
      return { ...state, renderedPages: updatedPages }
    }

    case 'CLEAR_RENDERED_PAGES':
      return { ...state, renderedPages: {} }

    case 'CLEAR_RENDERED_RANGES':
      return { ...state, renderedRanges: {} }

    //-----------------------------------------------------------------------------
    //------ Default  
    //-----------------------------------------------------------------------------

    default:
      return state
  }
}
