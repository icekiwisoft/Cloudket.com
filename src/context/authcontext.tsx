import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/useAxios";

const AuthContext = createContext<any>(null);

export default AuthContext;

interface AuthTokens {
    refresh: string
    access: string
}

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(`${localStorage.getItem("authTokens")}`)
            : null
    );


    const [theme, settheme] = useState<boolean>(() => (JSON.parse(`${localStorage.getItem("theme")}`)))

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(`${localStorage.getItem("authTokens")}`)
            : null
    );
    const [loading, setLoading] = useState(true);

    const history = useNavigate()

    const loginUser = async (username, password) => {
        const response = await fetch(`${baseURL}/accounts/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            history("/");
        } else {
            alert("Something went wrong!");
        }
    };

    const changetheme = () => {
        localStorage.setItem("theme", (theme === false).toString());
        settheme(theme === false);

    }

    const registerUser = async (username, email, password, password2) => {
        const response = await fetch(`${baseURL}//accounts/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                username,
                password,
                password2
            })
        });
        if (response.status === 201) {
            history("/login");
        } else {
            alert("Something went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history("/");
    };



    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        theme,
        changetheme
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};