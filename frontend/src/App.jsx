import React from 'react'
import KastraLanding from './pages/KastraLanding'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Signup from './pages/Signup'
import ContenPage from './pages/ContenPage'
import CollectionPage from './pages/CollectionPage'
import { createBrowserRouter,RouterProvider } from 'react-router'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <KastraLanding />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/contentpage',
      element:<ContenPage/>
    },
    {
      path:'/collections/:collectionId',
       element:<CollectionPage />
    }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
