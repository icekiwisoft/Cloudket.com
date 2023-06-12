import { Route, Redirect, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authcontext";

const PrivateRoute = ({ children, ...rest }) => {
    let { user } = useContext(AuthContext);
    let location = useLocation();
    if (!user) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: location }} />
    }


    return { ...children }
};

export default PrivateRoute;