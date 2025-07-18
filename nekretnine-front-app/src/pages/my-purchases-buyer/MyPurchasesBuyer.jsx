import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaClipboardList,
  FaCalendarAlt,
  FaTag,
  FaDollarSign,
  FaCreditCard,
  FaUser,
  FaTrash
} from 'react-icons/fa';
import './MyPurchasesBuyer.css';
import { Link } from "react-router-dom";

export default function MyPurchasesBuyer() {
  const [purchases, setPurchases]         = useState([]);
  const [categories, setCategories]       = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchCategories();
    fetchMyPurchases();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/property-categories');
      setCategories(res.data.categories || []);
    } catch {
      // silently ignore
    }
  };

  const fetchMyPurchases = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/my-purchases');
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];
      setPurchases(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await axios.delete(`/api/purchases/${id}`);
      setPurchases(ps => ps.filter(p => p.purchase_id !== id));
    } catch {
      alert('Failed to delete booking.');
    }
  };

  if (loading) return <p className="message">Loading…</p>;
  if (error)   return <p className="message error">{error}</p>;
  if (!purchases.length) {
    return <p className="message">You have no bookings yet.</p>;
  }

  // apply category filter
  const filtered = selectedCategory
    ? purchases.filter(p => p.property.category === selectedCategory)
    : purchases;

  return (
    <div className="my-purchases-buyer-page">
      <nav className="breadcrumbs-4">
              <Link to="/">Home</Link> / <span>My Bookings</span>
      </nav>
      <header className="purchases-header">
        <h1><FaClipboardList /> My Bookings</h1>
        <div className="filter-group">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.property_category_id} value={c.property_category_name}>
                {c.property_category_name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="purchases-grid">
        {filtered.map(p => (
          <article key={p.purchase_id} className="purchase-card">
            <header className="purchase-card-header">
              <h2>{p.property.name}</h2>
              <span className={`status-pill ${p.purchase_status}`}>
                {p.purchase_status}
              </span>
            </header>
            <div className="purchase-card-content">
              <div className="field">
                <FaCalendarAlt /><span>{p.purchase_date}</span>
              </div>
              <div className="field">
                <FaTag /><span>{p.property.category}</span>
              </div>
              <div className="field">
                <FaDollarSign /><span>${p.purchase_price.toLocaleString()}</span>
              </div>
              <div className="field">
                <FaCreditCard /><span>{p.purchase_payment_type}</span>
              </div>
              <div className="field">
                <FaUser /><span>{p.agent.email}</span>
              </div>
              {p.purchase_notes && (
                <div className="field notes">
                  <span>{p.purchase_notes}</span>
                </div>
              )}
            </div>
            <footer className="purchase-card-footer">
              <button
                className="btn-delete"
                onClick={() => handleDelete(p.purchase_id)}
              >
                <FaTrash /> Delete
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
