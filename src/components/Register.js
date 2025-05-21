// src/components/Register.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles/register.css';

const Register = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p className="subtitle">Join us to start chatting</p>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-message" role="alert">{error}</p>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Register;
