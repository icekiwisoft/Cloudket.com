import { useContext, useEffect } from 'react';
import Logo from '../assets/icon.png'

import './login.scss'
import AuthContext from '../context/authcontext';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {

    let { user, loginUser } = useContext(AuthContext);
    const navigate = useNavigate()

    if (user)
        navigate('/');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target)
        const username = e.target.email.value;
        const password = e.target.password.value;
        username.length > 0 && loginUser(username, password);
    };
    return (

        <div className="content">
            {!user &&
                <div className="login">
                    <div className='loginwrapper'>
                        <img src={Logo} alt='nest' />
                        <form onSubmit={handleSubmit}>

                            <input id="email" type='text' />
                            <input id="password" type='password' />
                            <button>login</button>
                            <span>you don't have an account <Link to={'/register'}>register Now</Link></span>

                        </form>

                    </div>

                </div>
            }

        </div>

    )
}