import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import AuthProvider from './AuthContext.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import RegisterContent from './RegisterContent.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <PrivateRoute><App /></PrivateRoute>,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <NotFound />
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <NotFound />
  },
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
