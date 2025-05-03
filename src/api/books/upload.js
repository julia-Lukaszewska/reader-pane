//------------------------------------------------------------------------------
//------ Post PDF (POST /Upload) to server for processing 
//------------------------------------------------------------------------------

import { api } from '../client.js'

//----------------------------------------------------------------------
//------ Upload book (POST /upload) 
//----------------------------------------------------------------------
export const uploadBook = async (formData) => {
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
