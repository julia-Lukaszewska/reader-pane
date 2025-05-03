//-----------------------------------------------------------------------------
//------ sortBooks – Utility to sort books by title or date 
//-----------------------------------------------------------------------------

export const sortBooks = (books, mode) => {
  const sorted = [...books]
  switch (mode) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    case 'date-asc':
      return sorted.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    case 'date-desc':
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    default:
      return sorted
  }
}
