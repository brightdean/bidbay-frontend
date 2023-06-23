import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"



const ItemPreview = ({data, isExpired = false}) => {
    
    const axiosPrivate = useAxiosPrivate()
    const [image, setImage] = useState()

    useEffect(()=> {
        axiosPrivate.get(data.imagePath, {responseType: "blob"})
        .then(response => setImage(response.data))
        .catch(error => console.log(error))
    }, [])

    const parseDate = (date) => {
        const parsed = new Date(date)
        console.log(parsed)
        return parsed.getDate() + "/" + (parsed.getMonth() + 1) + "/" + parsed.getFullYear()
    }


  return (
    <div className="flex flex-col h-full w-[300px] justify-center items-center bg-white drop-shadow-lg">
        {image && <img src={URL.createObjectURL(image)} className="w-full h-[200px] object-cover"></img>}
        <section className="flex flex-col w-full bg-white p-4">
            <span className="text-lg font-bold text-gray-800">
                {data.name}
            </span>

            <span className="-translate-y-1 text-gray-500 font-semibold truncate w-[80%]">{data.description}</span>
            {!isExpired && <span className="flex flex-col">
                <span className="font-bold text-red-600">Expires At</span>
                <span className="-translate-y-1 text-gray-500 font-bold">{parseDate(data.expiresAt)}</span>
            </span>}
            <span className="flex flex-col">
                <span className="text-gray-800 font-bold">Initial Price</span>
                <span className="-translate-y-1 text-gray-500 font-bold">{data.initialPrice} €</span>
            </span>
            <span className="flex flex-col">
                <span className="text-gray-800 font-bold">Current Price</span>
                <span className="-translate-y-1 text-gray-500 font-bold">{data.currentPrice} €</span>
            </span>
            <span className="flex flex-col">
                <span className="text-gray-800 font-bold">Bid Count</span>
                <span className="-translate-y-1 text-gray-500 font-bold">{data.bidCount}</span>
            </span>
            
        </section>
    </div>
  )
}

export default ItemPreview
