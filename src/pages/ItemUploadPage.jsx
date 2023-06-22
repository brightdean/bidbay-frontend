import { useRef, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from "../hooks/useAuth"
import { UPLOAD_ITEM_URL } from "../backend/urls"
import { useNavigate } from "react-router"
import { salesRoute } from "../routes"

const initialItem = {
    name: '',
    category: '',
    description: '',
    initialPrice: '',
    expiresAt: '',
    expiresAtTime: '',
    sellerId: ''
}

const ItemUploadPage = () => {

    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const navigate = useNavigate()

    const [item, setItem] = useState(initialItem)
    const fileInput = useRef()
    const [picUrl, setPicUrl] = useState()
    const [pic, setPic] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()

        const dateTime = item.expiresAt + " " + item.expiresAtTime + ":00"
        const itemPayload = {
            name: item.name,
            category: item.category,
            description: item.description,
            initialPrice: item.initialPrice,
            expiresAt: dateTime,
            sellerId: auth.user.id
        }

        let formData = new FormData()

        formData.append('item', JSON.stringify(itemPayload))
        formData.append('file', pic)

        axiosPrivate.post(UPLOAD_ITEM_URL, formData, {headers: {'Content-Type' : 'multipart/form-data'}})
        .then(response => {
            if(response.status === 201){
                navigate(salesRoute, {replace:true})
            }
        })
    }

    const handleUploadClick = (e) => {
        fileInput.current.click()
    }

    const handleFileSelect = (e) => {
        const blob = new Blob([e.target.files[0]]);
        const url = URL.createObjectURL(blob);
        setPicUrl(url);
        setPic(e.target.files[0]);

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }

    return (
        <div className="flex w-full h-full items-center justify-center bg-slate-200 p-6">
            <form noValidate onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-4 items-center w-[50%] min-w-[400px]">
                <div className="flex w-[250px] h-[250px]" onClick={handleUploadClick}>
                    <ImageContainer picUrl={picUrl} />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    id='profilePic'
                    ref={fileInput}
                    onChange={handleFileSelect}
                    className="hidden">

                </input>
                <section className="flex w-full space-x-4">
                    <input
                        name='name'
                        type='text'
                        value={item.name}
                        onChange={handleChange}
                        placeholder='Name'
                        className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                    </input>
                    <input
                        name='category'
                        type='text'
                        value={item.category}
                        onChange={handleChange}
                        placeholder='Category'
                        className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                    </input>
                </section>
                <textarea
                    name='description'
                    value={item.description}
                    onChange={handleChange}
                    placeholder='Description'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </textarea>
                <section className="flex w-full space-x-4">
                    <input
                        name='initialPrice'
                        type='number'
                        value={item.initialPrice}
                        onChange={handleChange}
                        placeholder='Price'
                        className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                    </input>

                </section>
                <section className="flex flex-col w-full">
                    <span className="flex w-full text-gray-500 font-bold justify-center">Sale Expiration</span>
                    <div className="flex w-full space-x-4">
                        <input
                            name='expiresAt'
                            type='date'
                            value={item.expiresAt}
                            onChange={handleChange}
                            placeholder='Available until'
                            className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                        </input>
                        <input
                            name='expiresAtTime'
                            type='time'
                            value={item.expiresAtTime}
                            onChange={handleChange}
                            placeholder='Available until time'
                            className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                        </input>
                    </div>
                </section>
                <button
                    type="submit" className="w-full my-16 p-3 bg-gray-800 transition ease-in-out duration:700 hover:bg-gray-700 text-white">Upload</button>


            </form>

        </div>
    )
}

const ImageContainer = ({ picUrl }) => {
    return (
        <div className="flex w-full h-full items-center justify-center cursor-pointer border-dotted border-[6px] border-gray-200 text-gray-400 font-bold">
            {picUrl ?
                <img src={picUrl}></img> :
                <span>Upload image</span>
            }
        </div>
    );
}

export default ItemUploadPage
