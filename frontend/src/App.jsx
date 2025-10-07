import React from 'react'
import KastraLanding from './pages/KastraLanding'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Signup from './pages/Signup'
import ContentPage from './pages/ContentPage'
import CollectionPage from './pages/CollectionPage'
import { createBrowserRouter,RouterProvider } from 'react-router'
import ExplorePage from './pages/Explore'

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
      path:'/contentpage/:contentId',
      element:<ContentPage/>
    },
    {
      path:'/explore',
      element:<ExplorePage/>
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
