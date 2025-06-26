/**
 * @file LibraryRoutes.jsx
 * @description Route configuration for the Library section.
 */

import React, { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components';

const LibraryLayout = lazy(() => import('@/layout/LibraryLayout'));

import {
  MyLibraryView,
  ImportBooksView,
  ArchiveView,
  FavoritesView,
} from '@/views';

/** Routes under '/library'. Exported as an array so it can be spread. */
const libraryRoutes = [
  {
    path: 'library',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LibraryLayout>
          <Outlet />
        </LibraryLayout>
      </Suspense>
    ),
    children: [
      // '/library'  (index)
      { index: true, element: <MyLibraryView /> },

      // '/library/import'
      { path: 'import',    element: <ImportBooksView /> },

      // '/library/archive'
      { path: 'archive',   element: <ArchiveView /> },

      // '/library/favorites'
      { path: 'favorites', element: <FavoritesView /> },
    ],
  },
];

export default libraryRoutes;
