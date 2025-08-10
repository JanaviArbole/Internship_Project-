import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            // const url = `${process.env.REACT_APP_API_URL}/auth/login`;
            // const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <div className="heading">
                <h1 className='text'>LOGIN</h1>
            <div className="underline"></div>
            </div>
            <form onSubmit={handleLogin}>
                <div className="grp-input">
                <div className="lbl">
                    <label htmlFor='email'>Email</label>
                </div>
                <div className="input">
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter email address'
                        value={loginInfo.email}
                    />
                </div>
                </div>
                <div className="grp-input">
                <div className="lbl">
                    <label htmlFor='password'>Password</label>
                </div>
                <div className="input">
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        value={loginInfo.password}
                    />
                </div>
                </div>
                <div className="btn">
                <button type='submit'>Login</button>
                </div>
                <div className="footer">
                <span>Don't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login





