import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { clickHereSignupText, createAccountText, invalidCredentialsText, loginHeaderText, loginSubmitText } from "../strings";
import axios from "../backend/axios";
import { LOGIN_URL } from "../backend/urls";
import { useLocation, useNavigate } from "react-router";
import { homeRoute, registerRoute } from "../routes";

const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from || homeRoute;


    const { auth, setAuth } = useAuth();

    const initialData = {
        email: '',
        password: ''
    }


    const [data, setData] = useState(initialData);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [credentialsError, setCredentialsError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        });
    }

    useEffect(() => {
        console.log(auth.user);
        console.log("LOGIN")
        if (auth.user)
            navigate(from, { replace: true })
    }, [auth.user])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid())
            login({ data })
    }

    const handleSignupClick = () => {
        navigate(registerRoute)
    }

    const isFormValid = () => {
        setEmailError('')
        setPasswordError('')
        let errorCount = 0;
        if (data.email === '') {
            setEmailError('Email is required');
            errorCount++;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
            setEmailError('Invalid email address');
            errorCount++;
        }
        if (data.password === '') {
            setPasswordError('Password is required');
            errorCount++;
        } else if (data.password.length < 4) {
            setPasswordError('Password must be at least 4 characters');
            errorCount++;
        }

        return errorCount === 0;
    }

    const login = async ({ data }) => {

        axios.post(LOGIN_URL, data)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    setAuth({ user: response.data })
                }


            }).catch(error => setCredentialsError(invalidCredentialsText))
    }


    return (
        <div className="flex h-screen w-screen bg-slate-200">
            <LoginForm data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSignupClick={handleSignupClick}
                emailError={emailError} passwordError={passwordError} authError={credentialsError} />
        </div>
    )
}

const LoginForm = ({ data, handleChange, handleSubmit, emailError, passwordError, authError, handleSignupClick }) => {


    return (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center m-auto w-[400px] bg-white shadow-2xl shadow-slate-400 px-8 rounded-sm pb-20 pt-4">
            <h2 className="text-lg text-gray-800 font-semibold py-14 text-center">{loginHeaderText}</h2>
            {authError && <span className='text-red-500 text-sm font-bold text-center'> {authError}</span>}
            <input
                name="email"
                type="email"
                placeholder="Email address"
                value={data.email}
                onChange={handleChange}
                className={'w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none ' + (emailError ? 'border-rose-600' : 'border-gray-300  mb-6')}>
            </input>
            {emailError && <div className={'text-red-500 text-sm font-bold mt-2 mb-6'}>{emailError}</div>}
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className={'w-full py-4 px-3 border-2 rounded-sm text-gray-700 leading-tight mt-5 focus:outline-none ' + (passwordError ? 'border-rose-600' : 'border-gray-300  mb-6')}>
            </input>
            {passwordError && <div className={'text-red-500 text-sm font-bold mt-2 mb-6'}>{passwordError}</div>}

            <button
                type="submit" className="w-full my-16 p-3 bg-gray-800 transition ease-in-out duration:700 hover:bg-gray-700 text-white">{loginSubmitText}</button>

            <div className="cursor-pointer" onClick={handleSignupClick}>
                <h2 className="text-md text-gray-500 text-center">{createAccountText}</h2>
                <h2 className="text-md text-gray-500 text-center">{clickHereSignupText}</h2>
            </div>
        </form>
    )

}

export default LoginPage