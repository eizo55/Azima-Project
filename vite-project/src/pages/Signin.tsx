import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/userHook";

import "../Styles/Navbar.css";
import "../Styles/signin.css";

import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";

import { FaUser, FaLock } from "react-icons/fa";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, login } = useAuthentication();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(e, email, password);
  };

  useEffect(() => {
    user ? navigate("/home") : navigate("/signin");
  });
  return (
    <div className="container">
      <NavBar navType="fnav" />
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FaLock className="icon" />
          </div>

          <OurButton label={"Sign-in"} position="center" type="submit" />
          <div className="register-link center-link ">
            <p>
              Don't have an account? <Link to="/Signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
