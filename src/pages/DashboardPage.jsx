import React from 'react'
import useAuth from '../hooks/useAuth'
import AppBar from '../components/AppBar'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { LOGOUT_URL } from '../backend/urls'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import { homeRoute, salesRoute } from '../routes'

const DashboardPage = () => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const handleLogout = () => {
        axiosPrivate.get(LOGOUT_URL)
        .then(response => {
            if(response.status === 200){
                localStorage.removeItem('user')
                Cookies.remove('access')
                Cookies.remove('refresh')
                navigate(homeRoute, {replace:true})
            }

        })
        .catch(error => console.log(error))
    }

    const handleSalesClick = () => {
        navigate(salesRoute)
    }

    return (
        <div className='flex w-screen h-screen bg-slate-200'>
            <AppBar user={auth.user} handleLogout={handleLogout} handleSalesClick={handleSalesClick}/>
        </div>
    );
}

export default DashboardPage