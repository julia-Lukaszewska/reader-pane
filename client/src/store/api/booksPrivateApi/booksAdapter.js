import { createEntityAdapter } from '@reduxjs/toolkit'
export const booksAdapter = createEntityAdapter({
  selectId: (b) => b._id,
})
