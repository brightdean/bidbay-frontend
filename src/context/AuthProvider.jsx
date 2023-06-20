import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const userData = JSON.parse(localStorage.getItem('user')) || {}
    const [auth, setAuth] = useState({ user: userData });


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext; 