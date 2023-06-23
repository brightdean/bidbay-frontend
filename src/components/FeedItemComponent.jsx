import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { } from '@heroicons/react/24/outline'
import { HandRaisedIcon } from "@heroicons/react/24/solid"
import { placeBidText } from "../strings"




const FeedItemComponent = ({ item, handlePlaceBid }) => {

    const axiosPrivate = useAxiosPrivate()
    const [image, setImage] = useState()
    const [showDesc, setShowDesc] = useState(false)

    const [showBid, setShowBid] = useState(false)

    const initialBid = {
        itemId: item.id,
        price: ''
    }
    
    const [bid, setBid] = useState(initialBid)

    

    useEffect(() => {
        console.log(item.imagePath)
        axiosPrivate.get(item.imagePath, { responseType: "blob" })
            .then(response => setImage(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(bid.price <= item.currentPrice){
            alert('Bid price must be greater than the current price')
            return
        }
        handlePlaceBid(bid)
    }

    const handleChange = (e) => {
        setBid({
            ...bid,
            price: e.target.value
        })
    }

    const parseDate = (date) => {
        const parsed = new Date(date)
        console.log(parsed)
        return parsed.getDate() + "/" + (parsed.getMonth() + 1) + "/" + parsed.getFullYear()
    }

    return (
        <div className="flex w-full drop-shadow-lg space-x-6">
            {image && <img src={URL.createObjectURL(image)} className="w-[300px] h-[300px] object-cover"></img>}
            <div className="flex flex-col w-full p-6 bg-white space-y-4">
                <span className="text-lg font-bold text-gray-800">
                    {item.name}
                </span>
                <div className="flex flex-col items-start w-[70%] mb-5">
                    <span className="text-gray-800 font-bold">Description</span>
                    <div style={{ maxHeight: showDesc ? '400px' : 0 }} className="min-h-[22px] overflow-hidden w-[400px] break-words text-left -translate-y-1 text-gray-500 transition-all duration-500 ease-in-out">
                        {item.description}
                    </div>
                    <span className="font-bold text-gray-700 cursor-pointer" onClick={() => setShowDesc(!showDesc)}>More..</span>
                </div>

                <div className="flex w-full items-center justify-start space-x-8">
                <span className="flex flex-col">
                    <span className="text-gray-800 font-bold">Upload Date</span>
                    <span className="text-gray-500 font-bold">{parseDate(item.createdAt)}</span>
                </span>
                <span className="flex flex-col">
                    <span className="text-gray-800 font-bold">Closing Date</span>
                    <span className="text-gray-500 font-bold">{parseDate(item.expiresAt)}</span>
                </span>
                </div>
               
                

                <section className="flex w-full items-center justify-between">
                    <span className="flex flex-col">
                        <span className="text-gray-800 font-bold">Starting Price</span>
                        <span className="-translate-y-1 text-gray-500 font-bold">{item.initialPrice} €</span>
                    </span>
                    <span className="flex flex-col">
                        <span className="text-gray-800 font-bold">Current Price</span>
                        <span className="-translate-y-1 text-gray-500 font-bold">{item.currentPrice} €</span>
                    </span>
                    <span className="flex flex-col">
                        <span className="text-gray-800 font-bold">Bid Count</span>
                        <span className="-translate-y-1 text-gray-500 font-bold">{item.bidCount}</span>
                    </span>
                </section>
                <section className="flex items-center w-full pt-6 space-x-12">
                    <div
                        className="flex items-center hover:bg-gray-100 transition-colors duration-500 ease-in-out p-2 cursor-pointer space-x-2" onClick={() => setShowBid(true)}>
                        <HandRaisedIcon className="w-8 h-8" color="green" />
                        <span className="font-semibold text-lg text-gray-500">{placeBidText}</span>
                    </div>
                    {showBid &&
                        <form noValidate onSubmit={handleSubmit}>
                            <input
                                name='bidAmount'
                                type='number'
                                value={bid.price}
                                onChange={handleChange}
                                placeholder='Price'
                                className='py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight focus:outline-none '>
                            </input>
                        </form>
                    }

                </section>
            </div>
        </div>
    )
}

export default FeedItemComponent
