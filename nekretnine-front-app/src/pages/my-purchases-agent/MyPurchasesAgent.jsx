import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaClipboardList,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaDollarSign,
  FaCreditCard,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import './MyPurchasesAgent.css';
import { Link } from "react-router-dom";

export default function MyPurchasesAgent() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  // attach token
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  // fetch agent bookings
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/agent-purchases');
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];
        setPurchases(list);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const res = await axios.patch(`/api/purchases/${id}/status`, {
        purchase_status: status
      });
      const updated = res.data.data ?? res.data;
      setPurchases(ps => ps.map(p => p.purchase_id === id ? updated : p));
    } catch {
      alert('Status update failed');
    }
  };

  if (loading) return <p className="message">Loading…</p>;
  if (error)   return <p className="message error">{error}</p>;
  if (!purchases.length) {
    return <p className="message">You don’t have any bookings for your properties yet.</p>;
  }

  return (
    <div className="my-purchases-agent-page">
      <nav className="breadcrumbs-4">
        <Link to="/agent-home">Home</Link> / <span>My Bookings</span>
      </nav>
      <header className="purchases-header">
        <h1><FaClipboardList /> Bookings Received</h1>
      </header>
      <div className="purchases-grid">
        {purchases.map(p => (
          <article className="purchase-card" key={p.purchase_id}>
            <header className="purchase-card-header">
              <h2>{p.property.name}</h2>
              <span className={`status-pill ${p.purchase_status}`}>
                {p.purchase_status}
              </span>
            </header>
            <div className="purchase-card-content">
              <div className="field"><FaCalendarAlt /><span>{p.purchase_date}</span></div>
              <div className="field"><FaTag /><span>{p.property.category}</span></div>
              <div className="field"><FaUser /><span>{p.buyer.email}</span></div>
              <div className="field"><FaDollarSign /><span>${p.purchase_price.toLocaleString()}</span></div>
              <div className="field"><FaCreditCard /><span>{p.purchase_payment_type}</span></div>
              <div className="field notes"><span>{p.purchase_notes || 'No notes'}</span></div>
            </div>
            {p.purchase_status === 'pending' && (
              <footer className="purchase-card-footer">
                <button
                  className="btn-complete"
                  onClick={() => changeStatus(p.purchase_id, 'completed')}
                >
                  <FaCheck /> Complete
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => changeStatus(p.purchase_id, 'canceled')}
                >
                  <FaTimes /> Reject
                </button>
              </footer>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
