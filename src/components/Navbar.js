// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">ChatApp</div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <button className="nav-button logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="nav-button" to="/login">Login</Link>
            <Link className="nav-button" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
