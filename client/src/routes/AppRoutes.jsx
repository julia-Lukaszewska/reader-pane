/**
 * @file AppRoutes.jsx
 * @description Defines application routes and layouts using React Router v6 with lazy loading and route protection.
 */

import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoadingSpinner } from '@/components'
import PrivateRoute from './PrivateRoute'
import libraryRoutes from './LibraryRoutes'
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
           libraryRoutes,
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
console.log('[ROUTES] router configuration created:', router.routes);
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
