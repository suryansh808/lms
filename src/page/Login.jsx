import React, { useEffect, useState, useRef  } from 'react'
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const errorRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors("gmail and paasword not match");
        }
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (errorRef.current && !errorRef.current.contains(event.target)) {
                    setErrors(null); // Clear error message if clicked outside
                }
            };
            // Attach event listener
            document.addEventListener('click', handleClickOutside);
    
            // Cleanup the event listener on component unmount
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);
 
    return (
        <div id='loginpage'>
           {errors &&   <div ref={errorRef} className='error'><p ><i class="fa fa-warning"></i> {errors} </p></div>}
           {/* <p className="error">{errors}</p> */}
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
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            required
                            placeholder='enter your password'
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
                <div className='loginwith'><Link to="/Loginwithotp" className=''>Login with OTP</Link></div>
            </div>
        </div>
    )
}

export default Login;
