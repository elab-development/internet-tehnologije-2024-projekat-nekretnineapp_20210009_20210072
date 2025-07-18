import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import './Login.css';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  // reset modal state
  const [showReset, setShowReset]            = useState(false);
  const [resetEmail, setResetEmail]          = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetError, setResetError]          = useState('');
  const [resetSuccess, setResetSuccess]      = useState('');

  // attach token (not strictly needed on login)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('/api/login', { email, password });
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      const role = data.user.role;
      switch (role) {
        case 'buyer':  window.location.replace('/'); break;
        case 'agent':  window.location.replace('/agent-home'); break;
        case 'admin':  window.location.replace('/admin-home'); break;
        default:       window.location.replace('/'); break;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const openReset = () => {
    setShowReset(true);
    setResetEmail(email);
    setResetNewPassword('');
    setResetError('');
    setResetSuccess('');
  };
  const closeReset = () => setShowReset(false);

  const handleReset = async e => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    try {
      await axios.post('/api/reset-password', {
        email: resetEmail,
        new_password: resetNewPassword
      });
      setResetSuccess('Password has been reset!');
    } catch (err) {
      setResetError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <AiOutlineMail className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <RiLockPasswordLine className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Log In
          </button>
        </form>
        <p className="forgot">
          Forgot your password?{" "}
          <button className="link-button" onClick={openReset}>
            Reset it
          </button>.
        </p>
        <p className="switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      {showReset && (
        <div className="modal-overlay">
          <div className="reset-modal">
            <h2>Reset Password</h2>
            {resetError   && <p className="error">{resetError}</p>}
            {resetSuccess && <p className="success">{resetSuccess}</p>}
            <form onSubmit={handleReset}>
              <div className="input-group">
                <AiOutlineMail className="icon" />
                <input
                  type="email"
                  placeholder="Your email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <RiLockPasswordLine className="icon" />
                <input
                  type="password"
                  placeholder="New password"
                  value={resetNewPassword}
                  onChange={e => setResetNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn">Confirm</button>
                <button type="button" className="btn-outline" onClick={closeReset}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
