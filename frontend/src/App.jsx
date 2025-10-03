import React from 'react'
import KastraLanding from './pages/KastraLanding'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Signup from './pages/Signup'
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
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
