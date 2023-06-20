
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './routes/Layout'
import { dashboardRoute, homeRoute, loginRoute, registerRoute } from './routes'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RequireAuth from './routes/RequireAuth'
import ProtectedPage from './pages/ProtectedPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route index path={homeRoute} element={<WelcomePage />} />
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={registerRoute} element={<RegisterPage />} />


        {/* ProtectedRoutes */}
        <Route element={<RequireAuth />}>
          <Route path={dashboardRoute} element={<DashboardPage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
