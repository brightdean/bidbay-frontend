import React from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import useAuth from '../hooks/useAuth'

const DashboardPage = () => {


    const { auth } = useAuth()

    return (
        <div className='flex w-screen h-screen bg-slate-200'>
            <section className='flex flex-col py-4 px-8 h-full w-[20%] min-w-[300px] bg-white justify-start space-y-6 items-center'>
                <section className='flex w-[70%] justify-around items-center'>
                    <img className='w-[45px] h-[45px]' src='logo.svg'></img>
                    <h2 className='font-semibold text-[40px] text-stone-500'>Bid Bay</h2>
                </section>
                <div className='flex w-full border-t-2 border-slate-200'></div>
                <section className='flex w-full pt-4 items-center justify-start space-x-3'>
                    <UserIcon className='rounded-full w-12 h-12 border-2 p-2 border-green-500' color='gray' />
                    <div className='flex flex-col items-start justify-start'>
                        <span className='text-[28px] font-semibold tracking-wide text-gray-700'>{auth.user.firstName} {auth.user.lastName}</span>
                        <span className='font-bold text-stone-500 text-[18px] tracking-wide -translate-y-2'>{auth.user.email}</span>
                    </div>


                </section>

            </section>
            <div className='flex flex-col h-full w-[80%]'></div>
        </div>
    )
}

export default DashboardPage