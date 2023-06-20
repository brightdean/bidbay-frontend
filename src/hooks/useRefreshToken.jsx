import axios from "../backend/axios";
import useAuth from "./useAuth";
import { REFRESH_URL } from "../backend/urls";
import Cookies from "js-cookie";


const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log("getting refresh");
        return axios.post(REFRESH_URL)
        .then(response => {
            console.log(response)
            return Cookies.get('access')
        })
        .catch(error => {
            console.log(error)
            return undefined;
        })
        
    }

    return refresh;
}

export default useRefreshToken;