// -----------------------------------------------------------------------------
//------- Progress API (GET /:id/progress) 
// -----------------------------------------------------------------------------

import { api } from '../client.js'

//----------------------------------------------------------------------
//------ Get reading progress (GET /:id/progress) 
//----------------------------------------------------------------------
export const getReadingProgress = async (bookId) => {
  const { data } = await api.get(`/${bookId}/progress`)
  return data
}

//----------------------------------------------------------------------
//------ Save reading progress (PATCH /:id/progress) 
//----------------------------------------------------------------------
export const saveReadingProgress = async (
  bookId,
  { currentPage, totalPages }
) => {
  const { data } = await api.patch(`/${bookId}/progress`, {
    currentPage,
    totalPages,
  })
  return data
}

//----------------------------------------------------------------------
//------Auto save progress (PATCH /:id/progress/auto) 
//----------------------------------------------------------------------
export const autoSaveProgress = async (bookId, currentPage, totalPages) => {
  const { data } = await api.patch(`/${bookId}/progress/auto`, {
    currentPage,
    totalPages,
  })
  return data
}
