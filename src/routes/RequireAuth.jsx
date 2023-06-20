import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { loginRoute } from "../routes";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AUTH_STATUS_URL } from "../backend/urls";

const RequireAuth = () => {

    const location = useLocation();

    const [status, setStatus] = useState(undefined);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(AUTH_STATUS_URL)
            .then(response => setStatus(response.status))
            .catch(error => setStatus(403))
    }, [])

    if (status) {
        return (
            
            status === 200 ? <Outlet /> : <Navigate to={loginRoute} state={{ from: location.pathname }} replace={true} />
        );
    } else return <></>;
}


export default RequireAuth;