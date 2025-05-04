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
const HomeView = lazy(() => import('@/views/HomeView.jsx'))
const SettingsView = lazy(() => import('@/views/SettingsView.jsx'))
const PageNotFoundView = lazy(() => import('@/views/PageNotFoundView.jsx'))

const MyLibraryView = lazy(() => import('@/views/library/MyLibraryView.jsx'))
const ImportBooksView = lazy(() => import('@/views/library/ImportBooksView.jsx'))
const ArchiveView = lazy(() => import('@/views/library/ArchiveView.jsx'))
const FavoritesView = lazy(() => import('@/views/library/FavoritesView.jsx'))

const ReaderView = lazy(() => import('@/views/reader/ReaderView.jsx'))



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
