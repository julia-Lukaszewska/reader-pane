//-----------------------------------------------------------------------------
//------ Barrel export for reader hooks 
//-----------------------------------------------------------------------------



export { default as useLoadPDFDocument } from './useLoadPDFDocument' //Async load + cleanup of PDF document 
export { default as usePDFPagination } from './usePDFPagination' //Pagination logic 
export { default as usePDFZoom } from './usePDFZoom' //Zoom level control 
export { default as usePreloadPDFPages } from './usePreloadPDFPages' //Preload surrounding pages 
export {default as useEnsureBookFileUrl} from './useEnsureBookFileUrl'
export { default as useLastOpenedBook } from './useLastOpenedBook' //Open book in reader

export { default as useStartingPage } from './useStartingPage' //Set starting page for book
export { default as useInitReaderSession } from './useInitReaderSession' //Initialize reader session


