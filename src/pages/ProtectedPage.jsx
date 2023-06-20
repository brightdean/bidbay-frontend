import React, { useEffect } from 'react'
import axios from '../backend/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const ProtectedPage = () => {
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        console.log("getting")
        axiosPrivate.get('/api/v1/users').then(response => console.log(response)).catch(error => console.log(error))
    }, [])
    return (
        <div>ProtectedPage</div>
    )
}

export default ProtectedPage