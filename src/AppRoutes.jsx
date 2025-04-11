import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Sets up routing system with React Router  
import GlobalStyles from './style/GlobalStyles' // Imports global styling rules  
import MainLayout from './layout/MainLayout' // Main layout used across all views  

// Views for different application pages
import HomeView from './views/HomeView' // Home screen view  
import ReaderView from './views/ReaderView' // Reader for displaying book content  
import MyLibraryView from './views/MyLibraryView' // User's library of books  
import SettingsView from './views/SettingsView' // User settings and preferences  
import PageNotFoundView from './views/PageNotFoundView' // Fallback view for unknown routes  
import ArchiveView from './views/ArchiveView' // View for deleted items  

// -----------------------------------------------------------------------------
//------ Router configuration  
// -----------------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: '/', // Root route of the application  
    element: <MainLayout />, // Shared layout used across all pages  
    errorElement: <PageNotFoundView />, // Displayed if path doesn't match any route  
    children: [
      {
        index: true, // Default child route ("/")  
        element: <HomeView />,
      },
      {
        path: 'library', // /library page  
        element: <MyLibraryView />,
      },
      {
        path: 'read', // Dynamic route for reading a book by ID  
        element: <ReaderView />,
      },
      {
        path: 'settings', // /settings page  
        element: <SettingsView />,
      },
      {
        path: 'deleted', // /deleted page (trash)  
        element: <ArchiveView />,
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
      {/* Inject global styles into the app   */}
      <GlobalStyles />

      {/* Provides the routing context to the app   */}
      <RouterProvider router={router} />
    </>
  )
}

// Export the component for use in index.jsx  
export default AppRoutes
