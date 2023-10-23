import React, { useContext, useEffect, useState } from 'react';
import Logo from '../assets/icon.png'

import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authcontext';
export default function Register() {

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    let { user, registerUser } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setusername('');
        setPassword('');
        setPassword2('');
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await registerUser(username, email, password, password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
    };


    return (
        <div className="content">

            <div className="register">
                <div className='registerwrapper'>
                    <div className='logo-wrapper'>
                        <img src={Logo} alt='nest' />

                    </div>
                    <form>
                        <div className='form-input'>
                            <label>username</label>
                            <input type='text' id="username" placeholder='user name' onChange={(e) => setusername(e.target.value)} />
                        </div>
                        <div className='form-input'>
                            <label>email</label>
                            <input type='email' id='email' placeholder='email' onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className='form-input'>
                            <label>password</label>
                            <input type='password' id='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='form-input'>
                            <label>password (validation)</label>
                            <input type='password' id='password2' placeholder='password (validation)' onChange={(e) => setPassword2(e.target.value)} />
                        </div>
                        <button onClick={handleSubmit}>register</button>
                        <span className='register-text'>already have an account <Link to={'login'}>login  now</Link></span>
                    </form>
                </div>
            </div>
        </div>)
}