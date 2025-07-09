import './Register.css';
import { useState } from 'react';
export default function Register() {
  const [formData, setFormData] = useState({
    InputName: "",
    InputEmail: "",
    InputPassword: "",
    InputConfirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.InputPassword !== formData.InputConfirmPassword) {
      setError("Password do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          InputName: formData.InputName,
          InputEmail: formData.InputEmail,
          InputPassword: formData.InputPassword
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setSuccess("Registration successful");
        setError("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }

  };

  return (
    <div className="d-flex align-items-center justify-content-center background-register" >
      <div className='d-flex shadow registerpage-css rounded overflow-hidden'>

        <div className="p-4 RegContent-css">

          <h3 className='mb-3 fw-bold fs-3 RegContent-heading text-center'>Register</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input type="text" className="form-control" id="InputName" placeholder="Enter Name" onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <input type="email" className="form-control" id="InputEmail" placeholder="Enter email" onChange={handleChange} required />
            </div>
            <div className="form-group  mb-3">
              <input type="password" className="form-control" id="InputPassword" placeholder="Enter password" onChange={handleChange} required />
            </div>
            <div className="form-group  mb-3">
              <input type="password" className="form-control" id="InputConfirmPassword" placeholder="Confirm password" onChange={handleChange} required />
            </div>
            <div className='text-center login-button'>
              <button type="submit" className="btn w-50  text-light">Register</button>
            </div>


          </form>
        </div>
      </div>

    </div>
  )
}