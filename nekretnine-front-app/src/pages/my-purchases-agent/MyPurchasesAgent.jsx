// src/pages/my-purchases-agent/MyPurchasesAgent.jsx
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

export default function MyPurchasesAgent() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  // attach bearer token
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // fetch agent-specific bookings
  useEffect(() => {
    const fetchAgentPurchases = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/agent-purchases');
        // Laravel ResourceCollection wraps array in `data`
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
    fetchAgentPurchases();
  }, []);

  // update status helper
  const changeStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`/api/purchases/${id}/status`, {
        purchase_status: newStatus
      });
      const updated = res.data.data ?? res.data; // handle Resource vs raw
      setPurchases(ps =>
        ps.map(p => p.purchase_id === id ? updated : p)
      );
    } catch {
      alert('Failed to change status.');
    }
  };

  // Render
  if (loading) {
    return <p className="message">Loading…</p>;
  }
  if (error) {
    return <p className="message error">{error}</p>;
  }
  if (!Array.isArray(purchases) || purchases.length === 0) {
    return <p className="message">You don’t have any bookings for your properties yet.</p>;
  }

  return (
    <div className="my-purchases-agent-page">
      <header className="purchases-header">
        <h1><FaClipboardList /> Bookings Received</h1>
      </header>
      <div className="purchases-grid">
        {purchases.map(p => (
          <div key={p.purchase_id} className="purchase-card">
            <div className="purchase-card-body">
              <h2 className="property-name">{p.property.name}</h2>
              <p className="category"><FaTag /> {p.property.category}</p>
              <p className="date"><FaCalendarAlt /> {p.purchase_date}</p>
              <p className="buyer"><FaUser /> {p.buyer.email}</p>
              <p className="price"><FaDollarSign /> {p.purchase_price.toLocaleString()}</p>
              <p className="payment"><FaCreditCard /> {p.purchase_payment_type}</p>
              <p className={`status status-${p.purchase_status}`}>
                {p.purchase_status.charAt(0).toUpperCase() + p.purchase_status.slice(1)}
              </p>

              {p.purchase_status === 'pending' && (
                <div className="status-buttons">
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
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
