/**
 * @file AppRoutes.jsx
 * @description Defines application routes and layouts using React Router v6 with lazy loading.
 */

import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoadingSpinner } from '@/components'

//-----------------------------------------------------------------------------
// Lazy-loaded Layouts
//-----------------------------------------------------------------------------
const HomeLayout = lazy(() => import('@/layout/HomeLayout'))
const MainLayout = lazy(() => import('@/layout/MainLayout'))
const LibraryLayout = lazy(() => import('@/layout/LibraryLayout'))
const ReaderLayout = lazy(() => import('@/layout/ReaderLayout'))
   
//-----------------------------------------------------------------------------
// Views
//-----------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
// Route Configuration
//-----------------------------------------------------------------------------
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
          { path: ':read', element: <ReaderView /> },
        ],
      },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <PageNotFoundView /> },
    ],
  },
])

//-----------------------------------------------------------------------------
// Component: AppRoutes
//-----------------------------------------------------------------------------

/**
 * Wraps the router configuration into a RouterProvider.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function AppRoutes() {
  return <RouterProvider router={router} />
}
