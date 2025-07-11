import './css/login.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
const Login = () => {
    
    const navigate = useNavigate();

    // States for email and password input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     // States for showing success or error messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
         // Sending login credentials to backend API
        const response = await fetch("http://localhost:5000/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // Receiving response from the server
        const data = await response.json();
        if (data.success) {
            // If login successful, navigate to dashboard and clear form
            setSuccess(navigate("/dashboard", { replace: true }));            

        } else {
            // If login fails, show error message temporarily
            setError("Password do not match!");
            setTimeout(() => setError(""), 3000);
        }
    };

     // Navigate to Register page when "Register" button is clicked
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
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success alert-dismissible">{success}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="form-group mb-3">
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email" required />
                        </div>
                        <div className="form-group  mb-3">
                            <input type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter password" required />
                        </div>
                        <div className='text-center login-button'>
                            <button type="submit" className="btn w-50 text-light" >Login</button>
                        </div>


                    </form>
                </div>
            </div>

        </div>


    )

}

export default Login;