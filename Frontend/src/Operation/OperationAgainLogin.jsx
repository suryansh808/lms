import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link , useNavigate } from 'react-router-dom';

import API from '../API';

const OperationAgainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/checkoperation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            toast.success('Login successful!');
            if (response.ok) {
                setTimeout(() => {
                    localStorage.setItem("operationId", response.data._id);
                localStorage.setItem("operationName", response.data.operationName);
                localStorage.setItem("operationToken", response.data.token);
                navigate("/OperationDashboard");
                }, 1500);
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('An error occurred while logging in');
        }
    };

    return (
        <div id='loginpage'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className='loginform'>
                <h2>Operation Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Company Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter company mail id'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            required
                            placeholder='Enter your password'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <p>--------------------or--------------------</p>
                <div className='loginwith'>
                    <Link to="/OperationLogin">Login with OTP</Link>
                </div>
            </div>
        </div>
    );
};

export default OperationAgainLogin;
