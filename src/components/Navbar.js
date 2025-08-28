// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bot, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (err) {
          console.error('Error parsing user data:', err);
        }
      }
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Bot className="logo-icon" size={24} />
        <span className="logo-text">AI ChatBot</span>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <div className="user-section">
            {user && (
              <div className="user-info">
                <User className="user-avatar" size={20} />
                <span className="user-name">Welcome, {user.name}!</span>
              </div>
            )}
            <button className="nav-button logout" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link className="nav-button" to="/login">
              <LogIn size={18} />
              Login
            </Link>
            <Link className="nav-button" to="/register">
              <UserPlus size={18} />
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
