// src/components/Register.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  X, 
  Check 
} from 'lucide-react';
import API from '../api';
import '../styles/register.css';

const Register = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
    
    // Validate password in real-time
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (!validatePassword(form.password)) {
      setError('Password does not meet security requirements');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...submitData } = form;
      await API.post('/auth/register', submitData);
      setSuccess('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response?.data?.errors) {
        // Handle validation errors from backend
        const errorMessages = err.response.data.errors.map(error => error.msg);
        setError(errorMessages.join(', '));
      } else {
        setError(err.response?.data?.msg || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="register-page">
      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-header">
            <UserPlus className="header-icon" size={40} />
            <h2>Create Account</h2>
            <p className="subtitle">Join us to start chatting with AI</p>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                minLength={2}
                maxLength={50}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group password-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password (min 8 characters)"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password strength indicator */}
          {form.password && (
            <div className="password-requirements">
              <p className="requirements-title">Password must contain:</p>
              <div className="requirement-list">
                <div className={`requirement ${passwordValidation.length ? 'valid' : 'invalid'}`}>
                  <span className="icon">
                    {passwordValidation.length ? <Check size={16} /> : <X size={16} />}
                  </span>
                  At least 8 characters
                </div>
                <div className={`requirement ${passwordValidation.uppercase ? 'valid' : 'invalid'}`}>
                  <span className="icon">
                    {passwordValidation.uppercase ? <Check size={16} /> : <X size={16} />}
                  </span>
                  One uppercase letter
                </div>
                <div className={`requirement ${passwordValidation.lowercase ? 'valid' : 'invalid'}`}>
                  <span className="icon">
                    {passwordValidation.lowercase ? <Check size={16} /> : <X size={16} />}
                  </span>
                  One lowercase letter
                </div>
                <div className={`requirement ${passwordValidation.number ? 'valid' : 'invalid'}`}>
                  <span className="icon">
                    {passwordValidation.number ? <Check size={16} /> : <X size={16} />}
                  </span>
                  One number
                </div>
                <div className={`requirement ${passwordValidation.special ? 'valid' : 'invalid'}`}>
                  <span className="icon">
                    {passwordValidation.special ? <Check size={16} /> : <X size={16} />}
                  </span>
                  One special character (@$!%*?&)
                </div>
              </div>
            </div>
          )}

          <div className="input-group password-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                disabled={isLoading}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password match indicator */}
          {form.confirmPassword && (
            <div className={`password-match ${form.password === form.confirmPassword ? 'match' : 'no-match'}`}>
              <span className="match-icon">
                {form.password === form.confirmPassword ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              </span>
              {form.password === form.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          {success && (
            <div className="success-message" role="status">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || !Object.values(passwordValidation).every(Boolean) || form.password !== form.confirmPassword}
          >
            {isLoading ? (
              <>
                <Loader2 className="loading-icon" size={20} />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </button>

          <p className="auth-link">
            Already have an account? <span onClick={() => navigate('/login')} className="link">Sign in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Register;
