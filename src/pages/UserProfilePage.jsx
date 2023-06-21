import React, { useState } from 'react'
import UserDetailsForm from '../forms/UserDetailsForm'
import useAuth from '../hooks/useAuth'
import { updateUserInfoText } from '../strings'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { USERS_URL } from '../backend/urls'

const UserProfilePage = () => {

    const { auth, setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [user, setUser] = useState(
        {
            id: auth.user.id,
            firstName: auth.user.firstName,
            lastName: auth.user.lastName,
            address:
                { ...auth.user.address }
        })

    const addressFields = ['road', 'roadNumber', 'postalCode', 'city', 'country']

    const handleChange = (e) => {
        const { name, value } = e.target
        if (addressFields.includes(name)) {
            setUser((prevData) => ({
                ...prevData,
                address: { ...prevData.address, [name]: value }
            }))
        } else {
            setUser((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosPrivate.put(USERS_URL + `/${user.id}`, user)
        .then(response => {
            if(response.status === 201){
                localStorage.setItem('user', JSON.stringify(response.data))
                setAuth({user: response.data})
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='flex flex-col w-screen h-screen bg-slate-200 items-center justify-center'>
            <div className='flex flex-col space-y-8 justify-center items-center'>
                <h2 className='text-lg text-gray-800 font-bold'>View and Update you profile details</h2>
                <div className='flex min-w-[400px] h-full items-center'>
                    <UserDetailsForm
                        data={user}
                        submitText={updateUserInfoText}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit} />
                </div>
            </div>


        </div>
    )
}

export default UserProfilePage
