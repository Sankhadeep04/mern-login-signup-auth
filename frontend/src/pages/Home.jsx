import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Database, Key, Calendar, LogOut, Check, RefreshCw, Cpu } from 'lucide-react';

const Home = () => {
  const { user, token, logout } = useAuth();
  const [copiedToken, setCopiedToken] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [testingApi, setTestingApi] = useState(false);

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Recently';

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  const testProtectedEndpoint = async () => {
    setTestingApi(true);
    setApiStatus(null);
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setApiStatus({ success: true, message: `API Authenticated! User email: ${data.user.email}` });
      } else {
        setApiStatus({ success: false, message: data.message || 'API request rejected' });
      }
    } catch (err) {
      setApiStatus({ success: false, message: 'Network error contacting backend API' });
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Banner Card */}
      <div className="welcome-card">
        <div className="welcome-badge">
          <ShieldCheck size={16} />
          <span>MongoDB Verified User Session</span>
        </div>
        <h1 className="welcome-title">Welcome back, {user?.email?.split('@')[0]}!</h1>
        <p className="welcome-desc">
          You are securely logged into your account. Credentials have been verified directly from MongoDB database records.
        </p>

        <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={handleCopyToken} className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
            {copiedToken ? <Check size={16} color="#10b981" /> : <Key size={16} />}
            <span>{copiedToken ? 'Token Copied!' : 'Copy JWT Token'}</span>
          </button>

          <button onClick={testProtectedEndpoint} className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
            {testingApi ? <RefreshCw size={16} className="spinner" /> : <Cpu size={16} />}
            <span>Test Protected /api/auth/me</span>
          </button>

          <button onClick={logout} className="btn btn-danger" style={{ fontSize: '0.875rem' }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {apiStatus && (
          <div
            className={`alert-box ${apiStatus.success ? 'alert-success' : 'alert-danger'}`}
            style={{ marginTop: '1.25rem', marginBottom: 0 }}
          >
            {apiStatus.success ? <Check size={18} /> : <ShieldCheck size={18} />}
            <span>{apiStatus.message}</span>
          </div>
        )}
      </div>

      {/* Account Info Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Database size={24} />
          </div>
          <div className="stat-info">
            <h4>MongoDB Account ID</h4>
            <p style={{ fontSize: '0.95rem', fontFamily: 'monospace' }}>{user?.id || user?._id}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.15)' }}>
            <ShieldCheck size={24} />
          </div>
          <div className="stat-info">
            <h4>Verified Email</h4>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#d946ef', background: 'rgba(217, 70, 239, 0.15)' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h4>Member Since</h4>
            <p style={{ fontSize: '1rem' }}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
