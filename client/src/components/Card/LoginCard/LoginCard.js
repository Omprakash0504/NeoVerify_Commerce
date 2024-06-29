import { Link, useNavigate } from 'react-router-dom';
import './LoginCard.css';
import { useState } from 'react';

const LoginCard = () => {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const login = () => {
        if(username=="omprakash@gmail.com"){
            if(password=="password@123"){
                navigate('/shop')
            }
            else{
                alert("Wrong Password");
            }
        }
        else{
            alert("User does not exist");
        }
    }

    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input type="email" onChange={e=>setUsername(e.target.value)} className="email__input login__input" placeholder='Email' />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label" >Password</label>
                        <input type="password" onChange={e=>setPassword(e.target.value)} className="password__input login__input" placeholder='Password'/>
                    </div>
                    <div className="login__button__container">
                        <button className="login__button" onClick={login}>LOGIN</button>
                    </div>
                </div>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginCard;