//------------------------------------------------------------------------------
//------get books (GET /) 
//------------------------------------------------------------------------------

import { api } from '../client.js'

export const getBooks = async () => {
  const { data } = await api.get('/')
  return data
}

export const getSingleBook = async (id) => {
  const { data } = await api.get(`/${id}`)
  return data
}
