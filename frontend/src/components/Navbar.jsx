import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <div className="container flex items-center justify-between" style={{ width: '100%' }}>
        <Link to="/" className="flex items-center gap-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Activity color="#4F46E5" size={32} />
          <span className="text-gradient">MediX AI</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#features" className="nav-link">Features</a>
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Login / Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
