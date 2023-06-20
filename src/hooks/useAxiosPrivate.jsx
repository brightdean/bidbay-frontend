
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { LOGOUT_URL } from "../backend/urls";
import Cookies from "js-cookie";
import axios from "../backend/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const forceLogout = () => {
        axios.post(LOGOUT_URL);
        setAuth({});
    }

    useEffect(() => {

        const requestIntercept = axios.interceptors.request.use(


            config => {

                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${Cookies.get('access')}`;

                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    if (!newAccessToken) {
                        console.warn('refresh expired, loggin out');
                        forceLogout();
                        return axios(prevRequest);
                    }

                    console.log('got new Access ' + newAccessToken);

                    prevRequest.headers['Authorization'] = `Bearer ${Cookies.get('access')}`;

                    //TODO test
                    setAuth(prev => {

                        return { ...prev, accessToken: Cookies.get("access") }
                    });

                    return axios(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])
    return axios;
}



export default useAxiosPrivate;
