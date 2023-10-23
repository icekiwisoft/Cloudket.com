
import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/authcontext';
import { Link } from 'react-router-dom';

const Logout = () => {
    let { logoutUser } = useContext(AuthContext);

    useEffect(() => {
        logoutUser();
    }, []);
    return <div className='content'>
        <div className='logout'>
            <span>you've log out <Link to="/login">login again</Link></span>
        </div>
    </div>
};

export default Logout;