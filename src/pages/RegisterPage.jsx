import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { alreadyHaveAccountText, clickHereLoginText, registerHeaderText, signupSubmitText } from '../strings';
import { useNavigate } from 'react-router';
import { dashboardRoute, loginRoute } from '../routes';
import axios from '../backend/axios';
import { REGISTER_URL } from '../backend/urls';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth()

    const initialData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: {
            road: '',
            roadNumber: '',
            postalCode: '',
            city: '',
            country: ''
        }
    }

    const addressFields = ['road', 'roadNumber', 'postalCode', 'city', 'country']

    const [data, setData] = useState(initialData);

    useEffect(() => {
        if (auth.user)
            navigate(dashboardRoute, { replace: true })
            
    }, [auth.user])

    const handleSubmit = (e) => {
        e.preventDefault()
        //TODO add validation
        register({ data })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if(addressFields.includes(name)){
            setData((prevData) => ({
                ...prevData,
                address: {...prevData.address, [name]: value}
            }))
        }else {
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    const handleSignInClick = () => {
        navigate(loginRoute);
    }

    const register = async ({ data }) => {
        axios.post(REGISTER_URL, data)
            .then(response => {
                if (response.status === 201) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    setAuth({ user: response.data })
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="flex h-full w-full bg-slate-200">
            <RegisterForm data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSignInClick={handleSignInClick}
            />
        </div>
    )
}

const RegisterForm = ({ data, handleChange, handleSubmit, handleSignInClick }) => {

    return (
        <form noValidate onSubmit={handleSubmit}
            className="flex flex-col space-y-4 items-center m-auto w-[700px] bg-white shadow-2xl shadow-slate-400 px-8 rounded-sm pb-20 pt-4">
            <h2 className="text-lg text-gray-800 font-semibold py-14 text-center">{registerHeaderText}</h2>
            <section className='flex w-full space-x-3'>
                <input
                    name='firstName'
                    type='text'
                    value={data.firstName}
                    onChange={handleChange}
                    placeholder='First name'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='lastName'
                    type='text'
                    value={data.lastName}
                    onChange={handleChange}
                    placeholder='Last name'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            <input
                name='email'
                type='email'
                value={data.email}
                onChange={handleChange}
                placeholder='Email'
                className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
            </input>
            <input
                name='password'
                type='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
            </input>
            <section className='flex w-full space-x-3'>
                <input
                    name='road'
                    type='text'
                    value={data.address.road}
                    onChange={handleChange}
                    placeholder='Road name'
                    className='w-[50%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='roadNumber'
                    type='number'
                    value={data.address.roadNumber}
                    onChange={handleChange}
                    placeholder='Road No'
                    className='w-[20%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='postalCode'
                    type='number'
                    value={data.address.postalCode}
                    onChange={handleChange}
                    placeholder='Postal code'
                    className='w-[30%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            <section className='flex w-full space-x-3'>
                <input
                    name='city'
                    type='text'
                    value={data.address.city}
                    onChange={handleChange}
                    placeholder='City'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='country'
                    type='text'
                    value={data.address.country}
                    onChange={handleChange}
                    placeholder='Country'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            <button
                type="submit" className="w-full my-16 p-4 bg-gray-800 transition ease-in-out duration:700 hover:bg-gray-700 text-white">{signupSubmitText}</button>

            <div className="cursor-pointer" onClick={handleSignInClick}>
                <h2 className="text-md text-gray-500 text-center">{alreadyHaveAccountText}</h2>
                <h2 className="text-md text-gray-500 text-center">{clickHereLoginText}</h2>
            </div>
        </form>
    );

}

export default RegisterPage