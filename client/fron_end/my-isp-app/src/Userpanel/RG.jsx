import { useEffect } from "react";
import "../css/Login.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React ,{ useState } from "react";;
import { useNavigate } from "react-router-dom";


const RG = () => {

const navigate = useNavigate();
 const [formData, setFormData] = useState({
    
    fullname: "",
    gender: "",
    address: "",
    city: "",
    mobile: "",
    email: "",
    password: "",
    dob: "",
  });
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  //  Insert data

  


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Registration successful!");
      navigate("/login"); // 🔥 Redirect to login page
    } else {
      alert("❌ " + (data.error || data.message));
    }
  };

  return (
    <section className="registartion d-flex align-items-center min-vh-100">
      <div className="register-box" data-aos="fade-up">
        <h2>Create Your Account</h2>

       <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <input type="text" name="fullname" placeholder="First Name"
             onChange={handleChange}/>
          </div>

          {/* Address */}
          <div className="form-group">
            <input type="text" name="address" placeholder="Address"
            onChange={handleChange} />
          </div>

          {/* City */}
          <div className="form-group">
            <input type="text" name="city" placeholder="City"
            onChange={handleChange} />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <input type="date" name="dob"
            onChange={handleChange} />
          </div>

          {/* Email */}
          <div className="form-group">
            <input type="email" name="email" placeholder="Email address"
            onChange={handleChange} />
          </div>

          {/* Password */}
          <div className="form-group">
            <input type="password" name="password" placeholder="Password"
            onChange={handleChange} />
          </div>

          {/* File Upload */}
          <div className="form-group">
            <input type="file" name="profileImage" accept="image/*"
            onChange={handleChange} />
          </div>

          {/* Gender */}
          <div className="gender-group">
            <label>
              <input type="radio" name="gender" value="Male" 
              onChange={handleChange}/> Male
            </label>

            <label>
              <input type="radio" name="gender" value="Female" 
              onChange={handleChange}/> Female
            </label>

            <label>
              <input type="radio" name="gender" value="Other"
              onChange={handleChange} /> Other
            </label>
          </div>

          <button type="submit" className="btn-register">
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
};

export default RG;
