import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? '/home' : '/login'} className="nav-brand">
        <div className="brand-icon">
          <ShieldCheck size={22} color="#ffffff" />
        </div>
        <span>NexusAuth</span>
      </Link>

      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <UserIcon size={16} />
              <span>{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <UserPlus size={16} />
              <span>Signup</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
