// readerSelectors.js
import { createSelector } from '@reduxjs/toolkit'
export const makeSelectRenderedPages = (bookId, scale) =>
  createSelector(
    state => state.reader,
    reader => reader.renderedPages?.[bookId]?.[scale] ?? {}
  )

export const makeSelectRenderedRanges = (bookId, scale) =>
  createSelector(
    state => state.reader,
    reader => reader.renderedRanges?.[bookId]?.[scale] ?? []
  )
export const selectReader = state => state.reader

export const selectBookId = (state) => state.reader.bookId


export const selectCurrentPage = state => selectReader(state).currentPage
export const selectTotalPages = state => selectReader(state).totalPages

export const selectFileUrl = (state) => state.reader.fileUrl

export const selectScaleIndex = (state) => state.reader.scaleIndex

export const selectCurrentScale = state => selectReader(state).currentScale

export const selectFitScaleFactor = (state) => state.reader.fitScaleFactor

export const selectFullPageFitScale = (state) => state.reader.fullPageFitScale

export const selectPageViewMode = state => selectReader(state).pageViewMode

export const selectPageTurnRate = (state) => state.reader.pageTurnRate

export const selectRenderedPages = (bookId, scale) => (state) => {
  return selectReader(state).renderedPages?.[bookId]?.[scale] ?? {}
}
export const selectRenderedRanges = (bookId, scale) => (state) => {
  return selectReader(state).renderedRanges?.[bookId]?.[scale] ?? []
}