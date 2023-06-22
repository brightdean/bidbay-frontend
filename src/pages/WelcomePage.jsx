import { useNavigate } from 'react-router'
import WelcomeAppBar from '../components/WelcomeAppBar'
import '../css/WelcomePage.css'
import { marketplaceRoute } from '../routes'

const WelcomePage = () => {

    const navigate = useNavigate()
    
    const handleMarketplaceClick = () => {
        navigate(marketplaceRoute)
    }

    return (
        <div className='flex flex-col w-screen h-screen'>
            <WelcomeAppBar handleMarketplaceClick={handleMarketplaceClick}/>
            <section className='app_banner flex flex-col items-center justify-center w-full h-full bg-gray-400'>
                <h1 className='text-[60px] text-stone-600 font-bold font-lobster'>Welcome to Bid Bay!</h1>
                <span 
                className='flex w-[70%] text-center text-[20px] font-montserrat pt-10'>
                    Discover a treasure trove of unique items, from rare collectibles to exquisite artwork. Set your sights on winning, feel the adrenaline rush, and make your mark as a top bidder.Join our vibrant community of auction enthusiasts today and let the bidding wars begin!
                    </span>
            
            </section>

        </div>
    )
}

export default WelcomePage