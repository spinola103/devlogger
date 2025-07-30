import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import API from "../services/api";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", data);

      // Save user and token to context (and possibly localStorage in context)
      setUser(res.data.user);
      setToken(res.data.token);

      // Redirect to dashboard on successful login
      navigate("/dashboard");
    } catch (err) {
      // Show error from server or generic message
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">Welcome Back to DevLogger</h2>

        {error && <div className="error-message">{error}</div>}

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
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
          required
          autoComplete="current-password"
          className="form-input"
        />

        <button type="submit" className="btn-primary">
          Log In
        </button>

        <p className="redirect-text">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
