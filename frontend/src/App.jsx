import React from 'react'
import KastraLanding from './pages/landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Signup from './pages/Signup'
import ContenPage from './pages/ContenPage'
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
    }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
