/**
 * @file AppRoutes.jsx
 * @description Defines application routes and layouts using React Router v6 with lazy loading and route protection.
 */

import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { LoadingSpinner } from '@/components'
import { useAuth } from '@/modules/user/hooks'

//-----------------------------------------------------------------------------
// PrivateRoute: Protects routes for authenticated users only
//-----------------------------------------------------------------------------
/**
 * Redirects to /login if the user is not authenticated.
 * Otherwise renders nested routes (Outlet).
 */
const PrivateRoute = () => {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

//-----------------------------------------------------------------------------
// Lazy-loaded Layouts
//-----------------------------------------------------------------------------
const HomeLayout    = lazy(() => import('@/layout/HomeLayout'))
const MainLayout    = lazy(() => import('@/layout/MainLayout'))
const LibraryLayout = lazy(() => import('@/layout/LibraryLayout'))
const ReaderLayout  = lazy(() => import('@/layout/ReaderLayout'))
   
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
    children: [
      { index: true, element: <HomeView /> }, // Public: Home page
    ],
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <PageNotFoundView />, // 404 under MainLayout
    children: [
      {
        element: <PrivateRoute />, // Protect all nested routes
        children: [
          {
            path: 'library',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <LibraryLayout />
              </Suspense>
            ),
              children: [
              { index: true, element: <MyLibraryView /> },
              { path: 'library', element: <MyLibraryView /> },

              { path: 'import',        element: <ImportBooksView /> }, // /library/import
              { path: 'archive',       element: <ArchiveView /> },     // /library/archive
              { path: 'favorites',     element: <FavoritesView /> },   // /library/favorites
            ],
          
          },
          
            { path: 'read/:bookId?', element: <ReaderLayout />, children: [
            { index: true, element: <ReaderView /> }, 
          ]},
          { path: 'settings', element: <SettingsView /> },         // /settings
        ],
      },
      { path: '*', element: <PageNotFoundView /> }, // Catch-all 404
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
