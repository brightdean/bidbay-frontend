import {ChevronLeftIcon, PlusIcon} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'
import { marketplaceRoute, itemUploadRoute } from '../routes'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { ITEMS_BY_SELLER_URL } from '../backend/urls'
import useAuth from '../hooks/useAuth'
import ItemPreview from '../components/ItemPreview'

const SalesPage = () => {

  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const {auth} = useAuth()

  const [items, setItems] = useState([])

  const handleMarketplaceClick = () => {
    navigate(marketplaceRoute)
  }

  const handleUploadClick = () => {
    navigate(itemUploadRoute);
  }

  useEffect(()=> {
    axiosPrivate.get(ITEMS_BY_SELLER_URL, {
      params: {id: auth.user.id, active:false}
    })
    .then(response => {
      if(response.status === 200)
        setItems(response.data)
    })
    .catch(error => console.log(error))
  },[])

  return (
    <div className='flex flex-col w-full h-full bg-slate-100'>
      <section className="flex p-3 bg-white w-full items-center justify-start">
        <div className='flex space-x-4 h-full items-center cursor-pointer' onClick={handleMarketplaceClick}>
          <ChevronLeftIcon className='w-8 h-8' color='gray'/>
          <h2 className='text-lg font-bold text-stone-600'>Back to Marketplace</h2>
        </div>
      </section>
      <section className='flex w-full p-4 border-t-2'>
        <button 
          className='flex space-x-3 items-center justify-center min-w-[160px] py-4 bg-green-600 rounded-full hover:bg-green-500 transition-colors duration-300 ease-in-out'
          onClick={handleUploadClick}>
          <PlusIcon className='w-6 h-6' color='white'/>
          <span className='text-white text-base font-bold'>Upload Item</span>
        </button>
      </section>
      <section className='flex flex-col w-full h-full items-start justify-start p-6 '>
        <span className='flex w-full text-[20px] font-semibold text-gray-700'>Active Sales</span>
        <div className='flex w-full h-full items-start justify-start py-4 space-x-12 overflow-x-auto'>
          {items.map(item => <div key={item.id}><ItemPreview data={item}/></div>)}
        </div>
         
      </section>
    </div>
  )
}

export default SalesPage
