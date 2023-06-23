
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './routes/Layout'
import { marketplaceRoute, homeRoute, itemUploadRoute, loginRoute, registerRoute, salesRoute, userProfileRoute, bidsRoute } from './routes'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RequireAuth from './routes/RequireAuth'
import MarketplacePage from './pages/MarketplacePage'
import SalesPage from './pages/SalesPage'
import UserProfilePage from './pages/UserProfilePage'
import ItemUploadPage from './pages/ItemUploadPage'
import BidsPage from './pages/BidsPage'

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
          <Route path={marketplaceRoute} element={<MarketplacePage />} />
          <Route path={salesRoute} element={<SalesPage/>}/>
          <Route path={bidsRoute} element={<BidsPage/>}/>
          <Route path={userProfileRoute} element={<UserProfilePage/>}/>
          <Route path={itemUploadRoute} element={<ItemUploadPage/>}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
