import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import avatar from "../assets/icon.png";
import lamp from "../assets/lamp.png";
import character from "../assets/chrecter2.png";

const SignUpPage = () => {
  return (
    <div className="container-fluid login-page">
      <div className="row h-100">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center left-section py-4">
          <img src={avatar} alt="Avatar" className="avatar mb-3" />
          <h2 className="welcome-text mb-4">JOIN US</h2>

          <form className="w-75">
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control custom-input" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Username</label>
              <input type="text" className="form-control custom-input" placeholder="Choose a username" />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input type="password" className="form-control custom-input" placeholder="Create a password" />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Confirm Password</label>
              <input type="password" className="form-control custom-input" placeholder="Confirm your password" />
            </div>
            <button className="btn btn-warning w-100 fw-bold">SIGN UP</button>
          </form>

          <div className="insta-handle mt-4 text-center">
            <span className="text-white">already have an account? </span>
            <Link to="/login" className="text-warning text-decoration-none fw-bold">Login</Link>
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

export default SignUpPage;
