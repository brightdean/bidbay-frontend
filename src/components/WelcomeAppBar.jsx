import {ArrowRightIcon } from '@heroicons/react/24/solid'
import { appName } from '../strings'

const WelcomeAppBar = ({handleMarketplaceClick}) => {
    return (
        <section className='flex items-center w-full bg-white p-6 max-h-[100px] justify-between'>
            <section className='flex justify-start items-center space-x-4'>
                <img className='w-[36px] h-[36px]' src='logo.svg'></img>
                <h2 className='font-semibold text-[30px] text-stone-500 font-lobster'>{appName}</h2>
            </section>

            <div className='flex items-center space-x-4 cursor-pointer group'
            onClick={handleMarketplaceClick}>
                <span className='text-[20px] group-hover:-translate-x-1 font-bold font-montserrat transition-transform duration-300 ease-in-out'>Go to Marketplace</span>
                <ArrowRightIcon className='w-8 h-8 group-hover:translate-x-2 transition-transform duration-300 ease-in-out'/>
            </div>
        
        </section>
    )
}

export default WelcomeAppBar
