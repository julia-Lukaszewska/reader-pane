//------------------------------------------------------
//------ Selectors for External Books Store 
//------------------------------------------------------
export const selectExternalList = (state) => state.externalBooks.list
export const selectExternalStatus = (state) => state.externalBooks.status
export const selectExternalError = (state) => state.externalBooks.error
export const selectIsImporting = (state) => state.externalBooks.isImporting
