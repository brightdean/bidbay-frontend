import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { alreadyHaveAccountText, clickHereLoginText, registerHeaderText, signupSubmitText } from '../strings';
import { useNavigate } from 'react-router';
import { loginRoute } from '../routes';

const RegisterPage = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

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

    const [data, setData] = useState(initialData);


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))

    }

    const handleSignInClick = () => {
        navigate(loginRoute);
    }

    return (
        <div className="flex h-screen w-screen bg-slate-200">
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
                    value={data.road}
                    onChange={handleChange}
                    placeholder='Road name'
                    className='w-[50%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='roadNumber'
                    type='number'
                    value={data.roadNumber}
                    onChange={handleChange}
                    placeholder='Road No'
                    className='w-[20%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='postalCode'
                    type='number'
                    value={data.postalCode}
                    onChange={handleChange}
                    placeholder='Postal code'
                    className='w-[30%] py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
            </section>
            <section className='flex w-full space-x-3'>
                <input
                    name='city'
                    type='text'
                    value={data.city}
                    onChange={handleChange}
                    placeholder='City'
                    className='w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none '>
                </input>
                <input
                    name='country'
                    type='text'
                    value={data.country}
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