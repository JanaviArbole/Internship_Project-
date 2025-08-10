import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        try {
            // const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
            const url = "http://localhost:8080/auth/signup";

            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else if (error) {
                handleError(error?.details?.[0]?.message || "Signup failed!");
            } else {
                handleError(message || "Signup failed!");
            }
            console.log(result);
        } catch (err) {
            handleError("Server error, please try again.");
            console.error(err);
        }
    };

    return (
        <div className='container'>
            {/* ===== Heading matches Login.js font style ===== */}
            <div className="heading">
                <h1 className='text'>SIGN UP</h1>
                <div className='underline'></div>
            </div>

            <form onSubmit={handleSignup}>
                <div className="grp-input">
                    <div className="lbl">
                        <label htmlFor='name'>Name</label>
                    </div>
                    <div className="input">
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name'
                            value={signupInfo.name}
                        />
                    </div>
                </div>

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
                            value={signupInfo.email}
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
                            placeholder='Enter your password'
                            value={signupInfo.password}
                        />
                    </div>
                </div>

                <div className="btn">
                    <button type='submit'>Signup</button>
                </div>

                <div className="footer">
                    <span>Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;