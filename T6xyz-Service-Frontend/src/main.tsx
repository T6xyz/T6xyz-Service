import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './components/ui/provider.tsx'
import { Home } from './pages/home/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {path : '/', element: <Home />},
  {path : '/login', element: <Login />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
        <RouterProvider router={router} />
        <App />
    </Provider>
  </StrictMode>
)
