import React, { useEffect, useState } from 'react'
import { marketplaceRoute } from '../routes'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Bid from '../components/Bid'
import { USER_BIDS_URL } from '../backend/urls'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'

const BidsPage = () => {

    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const [bids, setBids] = useState()

    const handleMarketplaceClick = () => {
        navigate(marketplaceRoute)
    }

    useEffect(() => {
        axiosPrivate.get(USER_BIDS_URL,
            { params: { userId: auth.user.id } })
            .then(response => {
                if (response.status === 200)
                    setBids(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='flex flex-col w-screen h-screen bg-slate-200'>
            <section className="flex p-3 bg-white w-full items-center justify-start">
                <div className='flex space-x-4 h-full items-center cursor-pointer' onClick={handleMarketplaceClick}>
                    <ChevronLeftIcon className='w-8 h-8' color='gray' />
                    <h2 className='text-lg font-bold text-stone-600'>Back to Marketplace</h2>
                </div>
            </section>
            <section className='flex flex-col w-full h-full items-start justify-start p-6 '>
                <span className='flex w-full text-[20px] font-semibold text-gray-700'>Bid History</span>
                <div className='flex w-full h-full items-start justify-start py-4 space-x-12 overflow-x-auto'>
                    {bids ?
                        bids.map(bid => <div key={bid.id}><Bid data={bid} /></div>) :
                        <div className='flex w-full items-center justify-center'>
                            <LoadingSpinner/>
                        </div>}
                </div>

            </section>
        </div>
    )
}

export default BidsPage
