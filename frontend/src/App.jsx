import React from 'react'
import KastraLanding from './pages/landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Signup from './pages/Signup'
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
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
