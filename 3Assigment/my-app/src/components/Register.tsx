import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {registerUser} from "../api/gameAPI";

export default function Register(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [message, setMessage] = useState("");

    const register = () => {
            registerUser(username, password).then((response) => {
                if (response !== 'Username already taken') {
                    setMessage("")
                    navigate('/');
                } else {
                    setMessage(response);
                }
            });
    };

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };


    return (
        <div className='register-container'>
            <h1>Register</h1>
            <div className='register-form'>
                <div className='register-form-row'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value={username} onChange={handleUsernameChange}/>
                </div>
                <div className='register-form-row'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' value={password} onChange={handlePasswordChange}/>
                </div>
                <div className='register-form-row'>
                    <button onClick={register}>Register</button>
                </div>
                <div className='register-form-row'>
                    <label htmlFor='login'>Already have an account?</label>
                    <button id='login'><Link to='/login'>Login</Link></button>
                </div>
                <div className='register-form-row'>
                    <label htmlFor='message'>{message}</label>
                </div>
            </div>
        </div>
    )
}