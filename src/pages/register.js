import { useContext, useEffect, useState } from 'react';
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
                    <img src={Logo} alt='nest' />
                    <form>


                        <input type='text' id="username" onChange={(e) => setusername(e.target.value)} />
                        <input type='email' id='email' onChange={(e) => setemail(e.target.value)} />
                        <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                        <input type='password' id='password2' onChange={(e) => setPassword2(e.target.value)} />
                        <button className='reg' onClick={handleSubmit}>register</button>
                        <span>already have an account <Link to={'login'}>login  now</Link></span>
                    </form>

                </div>

            </div>
        </div>
    )
}