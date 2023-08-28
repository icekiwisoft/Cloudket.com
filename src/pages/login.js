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
                        <div className='logo-wrapper'>
                            <img src={Logo} alt='nest' />

                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className='login-text'>
                                <h2>welcome back</h2>
                                <span>
                                    we are happy to see you again</span>
                            </div>
                            <div></div>
                            <div className='form-input'>
                                <label>email or username</label>
                                <input id="email" type='text' />
                            </div>

                            <div className='form-input'>
                                <label>password</label>
                                <input id="password" type='password' />

                            </div>
                            <button>login</button>
                            <span className='register-text'>you don't have an account <Link to={'/register'}>register Now</Link></span>

                        </form>

                    </div>

                </div>
            }

        </div>

    )
}