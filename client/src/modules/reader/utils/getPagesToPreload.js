const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2]
const PRELOAD_OFFSETS = {
  single: { before: 2, after: 2 },
  double: { before: 2, after: 3 },
  scroll: { before: 3, after: 6 },
}

export default function getPagesToPreload({ currentPage = 1, viewMode = 'single', zoomIndex = 2, pagesCount = 1 }) {
  const { before, after } = PRELOAD_OFFSETS[viewMode] || PRELOAD_OFFSETS.single
  const total = Math.max(1, pagesCount)
  const page = Math.min(Math.max(1, currentPage), total)
  const start = Math.max(1, page - before)
  const end = Math.min(total, page + after)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  const scale = ZOOM_LEVELS[zoomIndex] ?? ZOOM_LEVELS[2]
  return { pages, scale }
}