import axios from "axios";
import { BACKEND_URL } from "./urls";

export default axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        //'X-CSRFToken': Cookies.get('csrftoken')
    },
    withCredentials: true
});
