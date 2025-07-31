import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import avatar from "../assets/icon.png";
import lamp from "../assets/lamp.png";
import character from "../assets/chrecter1.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="container-fluid login-page">
      <div className="row h-100">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center left-section py-4">
          <img src={avatar} alt="Avatar" className="avatar mb-3" />
          <h2 className="welcome-text mb-4">WELCOME</h2>

          <form className="w-75" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-white">Username</label>
              <input 
                type="text" 
                className="form-control custom-input"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label text-white">Password</label>
              <input 
                type="password" 
                className="form-control custom-input"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end mb-3">
              <a href="#" className="text-warning text-decoration-none small">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn btn-warning w-100 fw-bold">LOGIN</button>
          </form>

          <div className="insta-handle mt-4 text-center">
            <span className="text-white">haven't any account? </span>
            <Link to="/signup" className="text-warning text-decoration-none fw-bold">Sign Up</Link>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center right-section position-relative">
          <img src={lamp} className="lamp" alt="Lamp" />
          <img src={character} className="character" alt="Character" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
