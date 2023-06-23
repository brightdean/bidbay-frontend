import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const Bid = ({data}) => {

    const axiosPrivate = useAxiosPrivate()

    const [image, setImage] = useState()

    useEffect(()=> {
        axiosPrivate.get(data.itemImagePath, {responseType: "blob"})
        .then(response => setImage(response.data))
        .catch(error => console.log(error))
    }, [])

  return (
    <div className="flex flex-col  space-y-6 h-full w-[300px] justify-center items-center bg-white drop-shadow-lg">
        {image && <img src={URL.createObjectURL(image)} className="w-full h-[200px] object-cover"></img>}
        <section className="flex flex-col w-full bg-white p-4">
            <span className="text-lg font-bold text-gray-800">
                {data.itemName}
            </span>

            
            <span className="flex flex-col">
                <span className="text-gray-800 font-bold">Bid Price</span>
                <span className="-translate-y-1 text-gray-500 font-bold">{data.price} €</span>
            </span>
        
            
        </section>
    </div>
  )
}

export default Bid
