import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';


const LoginWithOtp = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState();
    const [showOtp, setShowOtp] = useState(false);
    const errorRef = useRef(null);
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors("incorrect Credentials");

    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (errorRef.current && !errorRef.current.contains(event.target)) {
                setErrors(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        
        if (email === "danish.raja.akhtar@gmail.com") {
            setShowOtp(true);
        } else {
            setShowOtp(false);
        }
    }, [email]); 

    return (
        <div id='loginpage'>
            {errors && <div ref={errorRef} className='error'><p ><i class="fa fa-warning"></i> {errors}</p></div>}
          
            <div className='loginform'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='enter your email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {showOtp && (
                    <div>
                        <label htmlFor="opt">OTP:</label>
                        <input
                            type="number"
                            required
                            placeholder='enter OTP'
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>  )}

                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <p>--------------------or--------------------</p>
                <div className='loginwith'><Link to="/Login" className=''>Login with Password</Link></div>
            </div>
        </div>
    )
}

export default LoginWithOtp;
