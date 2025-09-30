import React from 'react'
import KastraLanding from './pages/landing'
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
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
