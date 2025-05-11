import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false); // <-- Reset login state
      navigate('/login');
    };
  
    return (
      <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}><strong>ChatApp</strong></Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    );
  };
  

export default Navbar;
