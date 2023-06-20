import axios from "../backend/axios";
import useAuth from "./useAuth";
import { REFRESH_URL } from "../backend/urls";
import Cookies from "js-cookie";


const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {
            withCredentials: true
        });
        setAuth(prev => {

            return { ...prev, accessToken: Cookies.get("access") } //response.data.access
        });

        return Cookies.get("access"); //response.data.access;
    }

    return refresh;
}

export default useRefreshToken;