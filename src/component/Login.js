import './login.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login",{
            method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
        });
    }

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Register');
    };
    return (
        <div className="d-flex align-items-center justify-content-center background-login" >
            <div className='d-flex shadow loginsignup-css rounded overflow-hidden'>
                <div className='w-50 text-white fw-bold fs-3 register-css text-center'>
                    <div className='register-heading'>
                        <h3>Welcome</h3>
                    </div>
                    <div className='lead'>
                        <p>Join to us a new user</p>
                    </div>
                    <div>
                        <button onClick={handleButtonClick} type="submit" className="btn btn-outline-light reg-btn">Register</button>
                    </div>

                </div>
                <div className="p-4 w-50 login-css">

                    <h3 className='mb-3 fw-bold fs-3 login-heading'>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email" required />
                        </div>
                        <div className="form-group  mb-3">
                            <input type="password" value={password} 
                                onChange={(e) => setEmail(e.target.value)} className="form-control" id="password" placeholder="Enter password" required />
                        </div>
                        <div className='text-center login-button'>
                            <button type="submit" className="btn w-50  text-light">Login</button>
                        </div>


                    </form>
                </div>
            </div>

        </div>


    )

}

export default Login;