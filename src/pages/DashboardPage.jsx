import React from 'react'
import useAuth from '../hooks/useAuth'
import AppBar from '../components/AppBar'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { LOGOUT_URL } from '../backend/urls'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import { homeRoute, salesRoute, userProfileRoute } from '../routes'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const DashboardPage = () => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const handleLogout = () => {
        axiosPrivate.get(LOGOUT_URL)
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('user')
                    Cookies.remove('access')
                    Cookies.remove('refresh')
                    navigate(homeRoute, { replace: true })
                }

            })
            .catch(error => console.log(error))
    }

    const handleProfileClick = () => {
        navigate(userProfileRoute)
    }

    const handleSalesClick = () => {
        navigate(salesRoute)
    }

    return (
        <div className='flex w-screen h-screen bg-slate-200'>
            <section className='fixed top-0 right-0 flex flex-col w-full'>
                <AppBar user={auth.user} handleLogout={handleLogout} handleProfileClick={handleProfileClick} handleSalesClick={handleSalesClick} />
                <div className='flex  justify-center w-full p-4'>
                    <div className='flex w-[50%] bg-white rounded-full p-4 drop-shadow-lg items-center justify-start space-x-4'>
                        <MagnifyingGlassIcon className='w-6 h-6' color='gray' />
                        <input
                            type='text'
                            placeholder='Search items...'
                            className='w-full text-gray-700 leading-tight focus:outline-none'>
                        </input>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default DashboardPage