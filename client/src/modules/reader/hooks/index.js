//-----------------------------------------------------------------------------
//------ Barrel export for reader hooks 
//-----------------------------------------------------------------------------



export { default as usePDFStreamer } from './usePDFStreamer' //Async load + cleanup of PDF document 

export { default as usePreloadPDFPages } from './usePreloadPDFPages' //Preload surrounding pages

export { default as useOpenReader } from './useOpenReader' //Navigate to reader
export { default as useLastOpenedBook } from './useLastOpenedBook' //Open book in reader

export { default as useStartingPage } from './useStartingPage' //Set starting page for book

export {default as useStreamingPdfManager} from './useStreamingPdfManager'

export { default as usePdfMetadata } from './usePdfMetadata'

export {default as usePageViewMode} from './usePageViewMode'