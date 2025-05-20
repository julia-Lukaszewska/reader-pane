const shouldPreload = (currentPage, renderedRanges, totalPages) => {
  const buffer = 4
  console.log('[shouldPreload] input →', { currentPage, renderedRanges, totalPages })

  if (!Array.isArray(renderedRanges) || typeof currentPage !== 'number') {
    console.warn('[shouldPreload] invalid input → return false')
    return false
  }

  const maxEnd = Math.max(...renderedRanges.map(([, end]) => end), 0)
  const should = currentPage >= maxEnd - buffer && maxEnd < totalPages

  console.log('[shouldPreload] maxEnd →', maxEnd)
  console.log('[shouldPreload] shouldPreload →', should)
  return should
}

export default shouldPreload