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
    // GET /library
    { index: true, element: <MyLibraryView /> },

    // GET /library/import
    { path: 'import', element: <ImportBooksView /> },

    // GET /library/archive
    { path: 'archive', element: <ArchiveView /> },

    // GET /library/favorites
    { path: 'favorites', element: <FavoritesView /> },
  ],
}

export default libraryRoutes
