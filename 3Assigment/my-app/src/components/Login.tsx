import {useState} from "react";
import {Link} from "react-router-dom";
import {login} from "../features/userService";
import {useAppDispatch} from "../app/hooks";
import {loginUser} from "../api/gameAPI";
import {useNavigate} from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const logIn = () => {
        loginUser(username, password).then((response) => {
            if(response !== 'Invalid username or password'){
                dispatch(login(response));
                setMessage("")
                navigate("/");
            } else {
                setMessage(response);
            }
        });
    };

    return (
        <div className='login-container'>
        <h1>Login</h1>
        <div className='login-form'>
            <div className='login-form-row'>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' value={username} onChange={handleUsernameChange}/>
            </div>
            <div className='login-form-row'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' value={password} onChange={handlePasswordChange}/>
            </div>
            <div className='login-form-row'>
                <button onClick={logIn}>Login</button>
            </div>
            <div className='login-form-row'>
                <label htmlFor='register'>Don't have an account?</label>
                <button id='register'><Link to='/register'>Register</Link></button>
            </div>
            <div className='login-form-row'>
                <label>{message}</label>
            </div>
        </div>
    </div>
    )
}