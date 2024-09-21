import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import PageNotFound from './app/components/Pages/PageNotFound'
import Products from './app/components/Pages/Products/Products'
import { Provider } from 'react-redux'
import store from './app/store'
import Login from './app/components/Pages/auth/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='font-sans font-thin'>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </div>

)
