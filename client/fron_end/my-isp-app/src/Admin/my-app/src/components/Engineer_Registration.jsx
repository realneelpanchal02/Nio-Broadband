import React, { useState } from "react";
import Input_form from "../components/Layout/Input_form";
import Long_text from "./Layout/Long_text";
import DoB from "./Layout/DoB";
import Redio_Button from "./Layout/Redio_Button";
import Button from "./Layout/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Engineer_Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gender: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    pincode: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/engineer", formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Engineer Registered Successfully!");
        setFormData({
          name: "",
          address: "",
          gender: "",
          email: "",
          password: "",
          mobile: "",
          dob: "",
          pincode: "",
        });
      }
    } catch {
      toast.error("Server Error!");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">

          {/* CARD */}
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Engineer Registration</h5>
            </div>

            <div
              className="card-body"
              style={{
                maxHeight: "70vh",   // card ki height limit
                overflowY: "auto"   // 🔥 scrollbar yahin aayega
              }}
            >
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input_form
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <Input_form
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <Long_text
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                      <Redio_Button
                        label="Male"
                        name="gender"
                        checked={formData.gender === "Male"}
                        onChange={() => handleChange("gender", "Male")}
                      />
                      <Redio_Button
                        label="Female"
                        name="gender"
                        checked={formData.gender === "Female"}
                        onChange={() => handleChange("gender", "Female")}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <DoB
                      label="Date of Birth"
                      value={formData.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input_form
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <Input_form
                      label="Mobile"
                      value={formData.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input_form
                      label="Pincode"
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="text-end mt-4">
                  <Button text="Register Engineer" type="submit" />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Engineer_Registration;
