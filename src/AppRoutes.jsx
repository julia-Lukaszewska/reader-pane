//-----------------------------------------------------------------------------
//------ AppRoutes: Application routes configuration using React Router  
//-----------------------------------------------------------------------------

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyles from './style/GlobalStyles'
import MainLayout from './layout/MainLayout'

import HomeView from './views/HomeView'
import ReaderView from './views/ReaderView'
import MyLibraryView from './views/MyLibraryView'
import SettingsView from './views/SettingsView'
import PageNotFoundView from './views/PageNotFoundView'
import ArchiveView from './views/ArchiveView'

//-----------------------------------------------------------------------------
//------ Router configuration  
//-----------------------------------------------------------------------------

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <PageNotFoundView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'library',
        element: <MyLibraryView />,
      },
      {
        path: 'read/:bookId',
        element: <ReaderView />,
      },
      {
        path: 'read',
        element: <ReaderView />,
      },
      {
        path: 'settings',
        element: <SettingsView />,
      },
      {
        path: 'deleted',
        element: <ArchiveView />,
      },
    ],
  },
])

//-----------------------------------------------------------------------------
//------ AppRoutes component  
//-----------------------------------------------------------------------------

const AppRoutes = () => {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
