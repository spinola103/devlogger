import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import API from "../services/api";
import "./Signup.css";

const Signup = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/signup", data);

      // Save user and token to context (and possibly localStorage in context)
      setUser(res.data.user);
      setToken(res.data.token);

      // Redirect to dashboard on successful signup
      navigate("/dashboard");
    } catch (err) {
      // Show error from server or generic message
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">Create Your DevLogger Account</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={data.username}
          required
          autoComplete="username"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleChange}
          value={data.email}
          required
          autoComplete="email"
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          onChange={handleChange}
          value={data.password}
          required
          autoComplete="new-password"
          className="form-input"
        />

        <button type="submit" className="btn-primary">
          Sign Up
        </button>

        <p className="redirect-text">
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
