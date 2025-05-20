
const sortBooks = (books, mode) => {
  const arr = [...books]

  const getDate = date => new Date(date || 0)
  const getText = text => (text || '').toLowerCase()
  const getNumber = val => Number(val) || 0

  const sorters = {
    // Title
    'title-asc':     (a, b) => getText(a.meta.title).localeCompare(getText(b.meta.title)),
    'title-desc':    (a, b) => getText(b.meta.title).localeCompare(getText(a.meta.title)),
    // Author
    'author-asc':    (a, b) => getText(a.meta.author).localeCompare(getText(b.meta.author)),
    'author-desc':   (a, b) => getText(b.meta.author).localeCompare(getText(a.meta.author)),
    // Date added (meta.addedAt)
'date-asc': (a, b) => getDate(a.meta.addedAt) - getDate(b.meta.addedAt),
'date-desc': (a, b) => getDate(b.meta.addedAt) - getDate(a.meta.addedAt),

    // Date updated (document.updatedAt)
    'updated-asc':   (a, b) => getDate(a.updatedAt) - getDate(b.updatedAt),
    'updated-desc':  (a, b) => getDate(b.updatedAt) - getDate(a.updatedAt),
    // Publication date (meta.publicationDate)
    'publication-asc':  (a, b) => getDate(a.meta.publicationDate) - getDate(b.meta.publicationDate),
    'publication-desc': (a, b) => getDate(b.meta.publicationDate) - getDate(a.meta.publicationDate),
    // Rating (flags.rating)
    'rating-asc':    (a, b) => getNumber(a.flags.rating) - getNumber(b.flags.rating),
    'rating-desc':   (a, b) => getNumber(b.flags.rating) - getNumber(a.flags.rating),
  }

  return arr.sort(sorters[mode] || sorters['title-asc'])
}

export default sortBooks
