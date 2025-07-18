import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/login', { email, password });
    // Persist token + user
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));

    // Redirect based strictly on your DB roles: buyer | agent | admin
    const role = data.user.role;
    switch (role) {
      case 'buyer':
        window.location.replace('/');
        break;
      case 'agent':
        window.location.replace('/agent-home');
        break;
      case 'admin':
        window.location.replace('/admin-home');
        break;
      default:
        window.location.replace('/');
    }
  } catch (err) {
    setError(err.response?.data?.error || 'Something went wrong');
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
        <p className="switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
