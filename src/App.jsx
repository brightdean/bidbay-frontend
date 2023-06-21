
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './routes/Layout'
import { dashboardRoute, homeRoute, loginRoute, registerRoute, salesRoute, userProfileRoute } from './routes'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RequireAuth from './routes/RequireAuth'
import DashboardPage from './pages/DashboardPage'
import SalesPage from './pages/SalesPage'
import UserProfilePage from './pages/UserProfilePage'

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
          <Route path={salesRoute} element={<SalesPage/>}/>
          <Route path={userProfileRoute} element={<UserProfilePage/>}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
