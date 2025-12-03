import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn btn-primary">Get Started</Link>
          </>
        ) : (
          <>
            {user?.role === 'tenant' && (
              <>
                <Link to="/tenant/dashboard" className="nav-btn">Dashboard</Link>
                <Link to="/tenant/properties" className="nav-btn">Browse</Link>
                <Link to="/tenant/requests" className="nav-btn">Requests</Link>
              </>
            )}
            {user?.role === 'landlord' && (
              <>
                <Link to="/landlord/dashboard" className="nav-btn">Dashboard</Link>
                <Link to="/landlord/properties" className="nav-btn">Properties</Link>
                <Link to="/landlord/requests" className="nav-btn">Requests</Link>
              </>
            )}
            <button onClick={handleLogout} className="nav-btn btn-outline" style={{ padding: '8px 20px' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
