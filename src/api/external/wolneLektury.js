//------------------------------------------------------------------------------
//------ Download external books from Wolne Lektury API 
//------------------------------------------------------------------------------

import axios from 'axios'

export async function fetchExternalBooks() {
  try {
    const { data } = await axios.get(
      'https://wolnelektury.pl/api/books/?format=json'
    )
    return data
  } catch {
    throw new Error('Could not download books')
  }
}
