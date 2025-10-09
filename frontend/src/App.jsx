import React from 'react'
import KastraLanding from './pages/KastraLanding'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Signup from './pages/Signup'
import ContentPage from './pages/ContentPage'
import CollectionPage from './pages/CollectionPage'
import { createBrowserRouter,RouterProvider } from 'react-router'
import ExplorePage from './pages/Explore'
import About from './pages/About'
import EditProfile from './pages/EditProfile'
import InsightPage from './pages/InsightPage'

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
    },
    {
      path:'/about',
       element:<About/>
    },
    {
      path:'/edit-profile',
       element:<EditProfile/>
    },
     {
      path:'/user-insights',
       element:<InsightPage/>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App
