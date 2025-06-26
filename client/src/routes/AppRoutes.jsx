/**
 * @file AppRoutes.jsx
 * @description Defines application routes and layouts using React Router v6
 *              with lazy loading and route protection.
 */

import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { LoadingSpinner } from '@/components';
import PrivateRoute from './PrivateRoute';
import libraryRoutes from './LibraryRoutes';

// -----------------------------------------------------------------------------
// Lazy-loaded layouts
// -----------------------------------------------------------------------------
const HomeLayout   = lazy(() => import('@/layout/HomeLayout'));
const MainLayout   = lazy(() => import('@/layout/MainLayout'));
const ReaderLayout = lazy(() => import('@/layout/ReaderLayout'));

// -----------------------------------------------------------------------------
// Views
// -----------------------------------------------------------------------------
import {
  HomeView,
  ReaderView,
  SettingsView,
  PageNotFoundView,
} from '@/views';

// -----------------------------------------------------------------------------
// Route configuration
// -----------------------------------------------------------------------------
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        {/* common root outlet */}
        <Outlet />
      </Suspense>
    ),
    children: [
      // Public Home page  '/'
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomeLayout>
              <HomeView />
            </HomeLayout>
          </Suspense>
        ),
      },

      // Protected section  '/library', '/read', '/settings', …
      {
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Suspense>
        ),
        errorElement: <PageNotFoundView />,
        children: [
          {
            element: <PrivateRoute />,
            children: [
              // Library-related routes
              ...libraryRoutes,

              // Reader  '/read/:bookId?'
              {
                path: 'read/:bookId?',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ReaderLayout>
                      <Outlet />
                    </ReaderLayout>
                  </Suspense>
                ),
                children: [{ index: true, element: <ReaderView /> }],
              },

              // Settings  '/settings'
              { path: 'settings', element: <SettingsView /> },
            ],
          },

          // Catch-all 404 inside protected section
          { path: '*', element: <PageNotFoundView /> },
        ],
      },

   
    ],
  },
]);

// -----------------------------------------------------------------------------
// Component: AppRoutes
// -----------------------------------------------------------------------------
/** Wraps the router configuration in a RouterProvider. */
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
