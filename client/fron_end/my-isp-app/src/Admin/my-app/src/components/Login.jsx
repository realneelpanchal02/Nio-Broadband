import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    adminemailid: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/login", formData);

      if (res.status === 200) {
        alert("Login Successful!");
        localStorage.setItem("adminemailid", formData.adminemailid);
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "/"; // redirect after login
      } else {
        console.log("Unexpected status:", res.status, res.data);
        alert("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Invalid Email or Password!");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg" style={{ width: "380px" }}>
        <div className="card-header bg-dark text-white text-center">
          <h4 className="mb-0">
            <i className="fas fa-user-shield me-2"></i> Admin Login
          </h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="adminemailid"
                className="form-control"
                placeholder="Enter email"
                value={formData.adminemailid}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-dark w-100" type="submit">
              Login
            </button>
          </form>
        </div>

        <div className="card-footer text-center text-muted small">
          © 2025 Admin Panel
        </div>
      </div>
    </div>
  );
};

export default Login;
