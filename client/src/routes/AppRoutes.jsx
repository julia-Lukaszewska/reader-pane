/**
 * @file AppRoutes.jsx
 * @description Defines application routes and layouts using React Router v6 with lazy loading and route protection.
 */

import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LoadingSpinner } from '@/components'
import PrivateRoute from './PrivateRoute'
import libraryRoutes from './LibraryRoutes'
//-----------------------------------------------------------------------------
// Lazy-loaded Layouts
//-----------------------------------------------------------------------------

const MainLayout    = lazy(() => import('@/layout/MainLayout'))
const ReaderLayout  = lazy(() => import('@/layout/ReaderLayout'))
   
//-----------------------------------------------------------------------------
// Views
//-----------------------------------------------------------------------------
import {
  HomeView,
  ReaderView,
  SettingsView,

} from '@/views'

//-----------------------------------------------------------------------------
// Route Configuration
//-----------------------------------------------------------------------------
const router = createBrowserRouter([
 
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    ),
  errorElement: <Navigate to="/" replace />,
    children: [
       { index: true, element: <HomeView /> }, // Public: Home page
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
   { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
console.log('[ROUTES] router configuration created:', router.routes)
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
