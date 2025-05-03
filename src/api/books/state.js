//------------------------------------------------------------------
//------Archive, Restore, Favorite, Unfavorite, Move to Trash, Delete 
//------------------------------------------------------------------

import { api } from '../client.js'

//----------------------------------------------------------------
//------ Archive (PATCH /:id/archive) 
export const archiveBook = (id) => api.patch(`/${id}/archive`)

//----------------------------------------------------------------
//------ Restore (PATCH /:id/restore) 
export const restoreBook = (id) => api.patch(`/${id}/restore`)

//----------------------------------------------------------------
//------ Favorite (PATCH /:id/favorite) 
export const favoriteBook = (id) => api.patch(`/${id}/favorite`)

//----------------------------------------------------------------
//------ Remove from favorites (PATCH /:id/unfavorite) 
export const unfavoriteBook = (id) => api.patch(`/${id}/unfavorite`)

//----------------------------------------------------------------
//------ Move to Trash (PATCH /:id/delete) 
export const moveToTrash = (id) => api.patch(`/${id}/delete`)

//----------------------------------------------------------------
//------ Permanently delete (DELETE /:id) 
export const deleteBookForever = (id) => api.delete(`/${id}`)
