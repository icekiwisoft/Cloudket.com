import defaultback from '../assets/defaultback.jpg'

import './login.scss'
export default function Login()
{
    return (
        <div  style={{backgroundImage:`url(${defaultback})`}}  className="content">
        
        <div className="login">
        <div className='loginwrapper'>
    
            <form>

            <input type='text'/>
          <input type='password'/>
          <button>login</button>
            </form>

        </div>

        </div>
        </div>
    )
}