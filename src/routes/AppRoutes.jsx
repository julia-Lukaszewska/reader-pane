// File: src/routes/AppRoutes.jsx
//-----------------------------------------------------------------------------
//------ AppRoutes 
//-----------------------------------------------------------------------------

import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoadingSpinner } from '@/components'

// Layouts – simple lazy-loaded imports
const HomeLayout = lazy(() => import('@/layout/HomeLayout'))
const MainLayout = lazy(() => import('@/layout/MainLayout'))
const LibraryLayout = lazy(() => import('@/layout/LibraryLayout'))
const ReaderLayout = lazy(() => import('@/layout/ReaderLayout'))

// Views
import {
  HomeView,
  MyLibraryView,
  ImportBooksView,
  ArchiveView,
  FavoritesView,
  ReaderView,
  SettingsView,
  PageNotFoundView,
} from '@/views'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomeLayout />
      </Suspense>
    ),
    children: [{ index: true, element: <HomeView /> }],
  },

  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <PageNotFoundView />,
    children: [
      {
        path: 'library',
        element: <LibraryLayout />,
        children: [
          { index: true, element: <MyLibraryView /> },
          { path: 'import', element: <ImportBooksView /> },
          { path: 'archive', element: <ArchiveView /> },
          { path: 'favorites', element: <FavoritesView /> },
        ],
      },
      {
        path: 'read',
        element: <ReaderLayout />,
        children: [
          { index: true, element: <ReaderView /> },
          { path: ':bookId', element: <ReaderView /> },
        ],
      },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <PageNotFoundView /> },
    ],
  },
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
