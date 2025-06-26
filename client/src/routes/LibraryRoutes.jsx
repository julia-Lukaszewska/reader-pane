/**
 * @file LibraryRoutes.jsx
 * @description Route configuration for the library section.
 */

import React, { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@/components'

const LibraryLayout = lazy(() => import('@/layout/LibraryLayout'))

import {
  MyLibraryView,
  ImportBooksView,
  ArchiveView,
  FavoritesView,
} from '@/views'

const libraryRoutes = {
  path: 'library',
  element: (
    <Suspense fallback={<LoadingSpinner />}>
      <LibraryLayout />
    </Suspense>
  ),
  children: [
    { index: true, element: <MyLibraryView /> },
    { path: 'library', element: <MyLibraryView /> },
    { path: 'import', element: <ImportBooksView /> },
    { path: 'archive', element: <ArchiveView /> },
    { path: 'favorites', element: <FavoritesView /> },
  ],
}

export default libraryRoutes
