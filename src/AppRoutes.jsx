// =============================================================================
// === Imports ===  
// =============================================================================

import { createBrowserRouter, RouterProvider } from 'react-router-dom'  

import GlobalStyles from './style/GlobalStyles'  
import MainLayout from './layout/MainLayout'  

import HomeView from './views/HomeView'  
import ReaderView from './views/ReaderView'  
import MyLibraryView from './views/MyLibraryView'  
import SettingsView from './views/SettingsView'  
import PageNotFoundView from './views/PageNotFoundView'  
import DeletedBooksView from './views/DeletedBooksView'  

// -----------------------------------------------------------------------------
//------ Router configuration  
// -----------------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: '/', // Root path of the app  
    element: <MainLayout />, // Main layout with header and sidebar  
    errorElement: <PageNotFoundView />, // Error view (e.g. 404)  
    children: [
      {
        index: true, // Default page – HomeView  
        element: <HomeView />,
      },
      {
        path: 'library', // Library view  
        element: <MyLibraryView />,
      },
      {
        path: 'read/:bookId', // Reader view with dynamic book ID  
        element: <ReaderView />,
      },
      {
        path: 'settings', // Settings view  
        element: <SettingsView />,
      },
      {
        path: 'deleted', // Deleted books view  
        element: <DeletedBooksView />,
      },
    ],
  },
])

// -----------------------------------------------------------------------------
//------ AppRoutes component  
// -----------------------------------------------------------------------------

const AppRoutes = () => {
  return (
    <>
      {/* GlobalStyles component   */}
      <GlobalStyles />

      {/* RouterProvider component   */}

      <RouterProvider router={router} />
    </>
  )
}

 
export default AppRoutes
