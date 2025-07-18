// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this user and all related data?')) return;
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(us => us.filter(u => u.id !== id));
    } catch {
      alert('Failed to delete user.');
    }
  };

  if (loading) return <p className="message">Loading…</p>;
  if (error)   return <p className="message error">{error}</p>;

  // filter out admins
  const nonAdminUsers = users.filter(u => u.role !== 'admin');

  return (
    <div className="dashboard-page">
      <nav className="breadcrumbs-4">
              <Link to="/admin-home">Home</Link> / <span>Dashboard</span>
      </nav>
      <h1 className="dashboard-title">User Management</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nonAdminUsers.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td className={`role role-${u.role}`}>{u.role}</td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
