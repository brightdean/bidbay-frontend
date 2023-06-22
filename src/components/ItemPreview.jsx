import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"



const ItemPreview = ({data}) => {
    
    const axiosPrivate = useAxiosPrivate()
    const [image, setImage] = useState()

    useEffect(()=> {
        axiosPrivate.get(data.imagePath, {responseType: "blob"})
        .then(response => setImage(response.data))
        .catch(error => console.log(error))
    }, [])
  return (
    <div className="flex flex-col h-full w-[400px] justify-center items-center bg-white p-6 rounded-lg drop-shadow-lg">
        {image && <img src={URL.createObjectURL(image)} className="w-[200px] h-[200px] object-cover"></img>}
        <section className="flex flex-col w-full bg-white p-4">
            <span className="text-lg font-bold text-gray-800">
                {data.name}
            </span>

            <span className="-translate-y-1 text-gray-500 font-semibold truncate w-[80%]">{data.description}</span>
            <span className="flex flex-col">
                <span className="text-gray-800 font-bold">Current Price</span>
                <span className="-translate-y-1 text-gray-500 font-bold">{data.currentPrice}</span>
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
