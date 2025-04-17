//-----------------------------------------------------------------------------
//------ Initial state of the application  
//-----------------------------------------------------------------------------

export const initialState = {
  //App settings  
  theme: 'light',  
  activeItem: null,  

  //Library  
  library: [],  

  //Active book  
  activeBook: null,  
  viewMode: 'single',  
  currentPage: 1,  

  //Rendered PDF pages  
  renderedPages: {},  
  renderedRanges: {},  

  //Zoom and pagination  
  scaleLevels: [0.5, 0.75, 1, 1.25, 1.5],  
  scaleIndex: 2,  
  batchSize: 20,  
  safetyOffset: 2,  
}

//-----------------------------------------------------------------------------
//------ Reducer: handles all state changes  
//-----------------------------------------------------------------------------

export function appReducer(state, action) {
  switch (action.type) {
    //-----------------------------------------------------------------------------
    //------ Theme & UI  
    //-----------------------------------------------------------------------------

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }

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

    case 'CLEAR_ACTIVE_BOOK':
      return { ...state, activeBook: null }

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }

    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }

    //-----------------------------------------------------------------------------
    //------ Zoom & preload  
    //-----------------------------------------------------------------------------

    case 'SET_SCALE_INDEX':
      return { ...state, scaleIndex: action.payload }

    case 'SET_BATCH_SIZE':
      return { ...state, batchSize: action.payload }

    case 'SET_SAFETY_OFFSET':
      return { ...state, safetyOffset: action.payload }

    //-----------------------------------------------------------------------------
    //------ Rendered PDF pages  
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
      const nextRanges = [...prevRanges, range].slice(-2)
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
      return {
        ...state,
        renderedPages: updatedPages,
      }
    }

    case 'CLEAR_RENDERED_PAGES':
      return { ...state, renderedPages: {} }

    case 'CLEAR_RENDERED_RANGES':
      return { ...state, renderedRanges: {} }

    default:
      return state
  }
}
