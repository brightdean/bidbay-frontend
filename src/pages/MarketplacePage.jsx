import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import AppBar from '../components/AppBar'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { ITEMS_FOR_USER_FILTERED_URL, ITEMS_FOR_USER_NEWEST_URL, LOGOUT_URL, PLACE_BID_URL } from '../backend/urls'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import { bidsRoute, homeRoute, salesRoute, userProfileRoute } from '../routes'
import { ArrowDownRightIcon, ArrowUpRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import FeedItemComponent from '../components/FeedItemComponent'
import LoadingSpinner from '../components/LoadingSpinner'

const initialFilterData = {
    '1': { page: 0, by: "createdAt", sort: "desc" },
    '2': { page: 0, by: "createdAt", sort: "asc" },
    '3': { page: 0, by: "currentPrice", sort: "asc" },
    '4': { page: 0, by: "currentPrice", sort: "desc" },
    '5': {},
}
//this is performance costly
let filterData = JSON.parse(JSON.stringify(initialFilterData))

const MarketplacePage = () => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { auth } = useAuth()

    const [nameSearch, setNameSearch] = useState()
    const [items, setItems] = useState([])
    const pageRef = useRef(0);

    const [loading, setLoading] = useState(true)


    const [activeFilter, setActiveFilter] = useState('1')

    useEffect(() => {
        setItems([])
        setLoading(true)
        console.log(initialFilterData)
        filterData = JSON.parse(JSON.stringify(initialFilterData))

        fetchItemsFiltered(filterData[activeFilter])
    }, [activeFilter])

    const fetchNewestItems = () => {
        if (pageRef.current != -1) {
            axiosPrivate.get(ITEMS_FOR_USER_NEWEST_URL,
                { params: { page: pageRef.current } })
                .then(response => {
                    if (response.status === 200) {

                        setItems(items.concat(response.data.content))
                        getNextPage(response.data)
                    }
                })
                .catch(error => console.log(error))
        }

    }

    const getNextPage = (pageable) => {
        const hasNextPage = (pageable.totalPages - (pageable.number + 1)) > 0

        if (hasNextPage)
            pageRef.current = pageRef.current + 1
        else
            pageRef.current = -1;
    }

    const getFilterNextPage = (pageable) => {
        const hasNextPage = (pageable.totalPages - (pageable.number + 1)) > 0
        console.log(filterData[activeFilter])
        if (hasNextPage)
            filterData[activeFilter].page = filterData[activeFilter].page + 1
        else
            filterData[activeFilter].page = -1;

        console.log(filterData[activeFilter])
    }

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

    const handleBidsClick = () => {
        navigate(bidsRoute)
    }

    const handleNameSearch = (e) => {
        e.preventDefault()
    }


    const handlePlaceBid = (data) => {

        axiosPrivate.post(PLACE_BID_URL, data)
            .then(response => {
                if (response.status === 201) {
                    const newItems = items.map(item => {
                        if (item.id === data.itemId) {
                            let addBid = response.data.followUp ? 0 : 1
                            console.log(addBid)

                            return { ...item, currentPrice: response.data.price, bidCount: item.bidCount + addBid };
                        }
                        return item;
                    });

                    setItems(newItems)
                }
            })
            .catch(error => console.log(error))
    }

    const fetchItemsFiltered = (ps) => {
        if (ps.page != -1) {
            axiosPrivate.get(ITEMS_FOR_USER_FILTERED_URL,
                { params: ps })
                .then(response => {
                    if (response.status === 200) {
                        if (ps.page === 0)
                            setItems(response.data.content)
                        else
                            setItems(items.concat(response.data.content))
                        getFilterNextPage(response.data, ps)
                    }
                })
                .catch(error => console.log(error))
                .finally(()=> setLoading(false))
        }
    }

    const handleFilterClick = (e) => {
        setActiveFilter(e.currentTarget.getAttribute('id'))
    }

    return (
        <div className='flex w-screen h-screen bg-slate-200'>
            <section className='fixed top-0 right-0 flex flex-col w-full h-full'>
                <AppBar user={auth.user} handleLogout={handleLogout} handleProfileClick={handleProfileClick} handleSalesClick={handleSalesClick} handleBidsClick={handleBidsClick} />
                <div className='flex flex-col justify-start items-center w-full h-full p-4 space-y-8 overflow-y-scroll'>
                    <form noValidate onSubmit={handleNameSearch} className='flex w-[50%] bg-white rounded-full p-4 drop-shadow-lg items-center justify-start space-x-4'>
                        <MagnifyingGlassIcon className='w-6 h-6' color='gray' />
                        <input
                            type='text'
                            placeholder='Search items by name...'
                            className='w-full text-gray-700 leading-tight focus:outline-none'>
                        </input>
                    </form>

                    <section className='flex items-center w-[62%] space-x-4 justify-evenly pb-12'>
                        <Filter content={
                            <span className='flex items-center space-x-4'>
                                <p>Upload Date</p>
                                <ArrowDownRightIcon className='w-5 h-5' />
                            </span>
                        }
                            handleClick={handleFilterClick}
                            id={'1'} />
                        <Filter content={
                            <span className='flex items-center space-x-4'>
                                <p>Upload Date</p>
                                <ArrowUpRightIcon className='w-5 h-5' />
                            </span>
                        }
                            handleClick={handleFilterClick}
                            id={'2'} />
                        <Filter content={
                            <span className='flex items-center space-x-4'>
                                <p>Price</p>
                                <ArrowUpRightIcon className='w-5 h-5' />
                            </span>
                        }
                            handleClick={handleFilterClick}
                            id={'3'} />

                        <Filter content={
                            <span className='flex items-center space-x-4'>
                                <p>Price</p>
                                <ArrowDownRightIcon className='w-5 h-5' />
                            </span>
                        }
                            handleClick={handleFilterClick}
                            id={'4'} />

                        <Filter content={
                            <span className='flex items-center space-x-4'>
                                <p>Expiring Soon</p>
                            </span>
                        }
                            handleClick={handleFilterClick}
                            id={'5'} />
                    </section>

                    {!loading ? items.map(item => <div key={item.id}
                        className='flex w-[70%]'>
                        <FeedItemComponent item={item} handlePlaceBid={handlePlaceBid} />
                    </div>) :
                        <div className='flex w-full items-center justify-center'>
                            <LoadingSpinner />
                        </div>}

                    <button
                        className='p-3 outline-none border-none rounded-lg bg-stone-600 text-white font-bold'
                        onClick={() => fetchItemsFiltered(filterData[activeFilter])}>
                        Load More
                    </button>
                </div>
            </section>

        </div>
    );
    function Filter({ content, handleClick, id }) {

        return (
            <div id={id}
                className={`flex p-4 ${activeFilter === id ? 'bg-stone-600 text-white' : 'bg-white text-gray-600 '} rounded-full font-bold cursor-pointer hover:-translate-y-[6px] transition-transform duration-300 ease-in-out drop-shadow-lg`}
                onClick={handleClick}>
                {content}
            </div>
        );
    }
}



export default MarketplacePage