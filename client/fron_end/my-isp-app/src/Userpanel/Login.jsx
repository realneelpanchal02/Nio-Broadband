import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ adminemailid: '', password: '' });
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/adminlogin', formData);

      if (res.status === 200) {
        alert('Login Successful!');
        localStorage.setItem('adminemailid', formData.adminemailid);
        localStorage.setItem('isAdminLoggedIn', 'true');
       window.location.href = " http://localhost:5174/";

      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      alert(err.response?.data?.message || 'Invalid Email or Password!');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
      <div className="card shadow p-4" style={{ width: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 text-primary">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email ID</label>
            <input
              type="email"
              name="adminemailid"
              placeholder="Enter Email ID"
              className="form-control"
              value={formData.adminemailid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-info text-white fw-bold">Login</button>
          </div>
        </form>
        <center className="mt-3">
          <a href="/Register">** New Customer Register..!</a>
        </center>
      </div>
    </div>
  );
}
  