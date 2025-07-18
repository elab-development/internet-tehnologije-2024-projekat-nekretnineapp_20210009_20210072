// src/pages/my-properties/MyProperties.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useLocations from '../../hooks/useLocations';
import './MyProperties.css';

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({
    property_name: '',
    property_price: '',
    property_description: '',
    property_image_link: '',
    property_360_image_link: '',
    fk_property_category_id: '',
    location: '',
  });
  const [error, setError] = useState('');

  // Attach token to axios
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  // Fetch categories and this agent's properties
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/property-categories');
        setCategories(res.data.categories);
      } catch {}
    };
    const fetchMyProps = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/properties', { params: { per_page: 100 } });
        const userId = JSON.parse(sessionStorage.getItem('user')).id;
        setProperties(res.data.properties.filter(p => p.fk_agent_id === userId));
      } catch {
        setError('Failed to load your properties.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    fetchMyProps();
  }, []);

  // Reverse‐geocode each property
  const locations = useLocations(properties);

  // Modal open/close
  const openCreate = () => setShowCreateModal(true);
  const closeCreate = () => {
    setShowCreateModal(false);
    setError('');
    setForm({
      property_name: '',
      property_price: '',
      property_description: '',
      property_image_link: '',
      property_360_image_link: '',
      fk_property_category_id: '',
      location: '',
    });
  };

  // Form field change
  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // Create new property (forward‐geocode location → lat/lon)
  const handleCreate = async e => {
    e.preventDefault();
    setError('');
    let lat, lon;
    try {
      const geo = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: form.location, format: 'json', limit: 1 }
      });
      if (!geo.data.length) {
        setError('Location not found');
        return;
      }
      lat = geo.data[0].lat;
      lon = geo.data[0].lon;
    } catch {
      setError('Failed to geocode location');
      return;
    }

    try {
      await axios.post('/api/properties', {
        ...form,
        property_latitude: lat,
        property_longitude: lon
      });
      // Refresh list
      const res = await axios.get('/api/properties', { params: { per_page: 100 } });
      const userId = JSON.parse(sessionStorage.getItem('user')).id;
      setProperties(res.data.properties.filter(p => p.fk_agent_id === userId));
      closeCreate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property.');
    }
  };

  // Update price
  const handleUpdate = async prop => {
    const newPrice = prompt('Enter new price:', prop.property_price);
    if (newPrice == null) return;
    if (isNaN(newPrice) || Number(newPrice) < 0) {
      alert('Invalid price');
      return;
    }
    try {
      await axios.patch(`/api/properties/${prop.property_id}`, { property_price: newPrice });
      setProperties(ps =>
        ps.map(p =>
          p.property_id === prop.property_id
            ? { ...p, property_price: Number(newPrice) }
            : p
        )
      );
    } catch {
      alert('Failed to update property.');
    }
  };

  // Delete property
  const handleDelete = async prop => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await axios.delete(`/api/properties/${prop.property_id}`);
      setProperties(ps => ps.filter(p => p.property_id !== prop.property_id));
    } catch {
      alert('Failed to delete property.');
    }
  };

  return (
    <div className="my-properties-page">
      <div className="properties-header">
        <h1>My Properties</h1>
        <button className="btn-primary" onClick={openCreate}>
          Make New Property
        </button>
      </div>

      {loading ? (
        <p className="message">Loading…</p>
      ) : properties.length === 0 ? (
        <p className="message">You have no properties yet.</p>
      ) : (
        <div className="properties-grid">
          {properties.map(prop => {
            // Find category by property_category_id
            const cat = categories.find(c =>
              c.property_category_id === prop.fk_property_category_id
            );
            return (
              <div key={prop.property_id} className="property-card">
                <img
                  src={prop.property_image_link}
                  alt={prop.property_name}
                  className="property-card-image"
                />
                <div className="property-card-body">
                  <h3>{prop.property_name}</h3>
                  <p className="category">
                    {cat?.property_category_name || 'Uncategorized'}
                  </p>
                  <p className="price">${prop.property_price.toLocaleString()}</p>
                  <p className="location">
                    {locations[prop.property_id] || 'Loading…'}
                  </p>
                </div>
                <div className="property-card-footer">
                  <FaEdit className="icon-btn" onClick={() => handleUpdate(prop)} />
                  <FaTrash className="icon-btn delete" onClick={() => handleDelete(prop)} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>New Property</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleCreate}>
              <input
                name="property_name"
                placeholder="Name"
                value={form.property_name}
                onChange={handleChange}
                required
              />
              <input
                name="property_price"
                type="number"
                placeholder="Price"
                value={form.property_price}
                onChange={handleChange}
                required
              />
              <textarea
                name="property_description"
                placeholder="Description"
                value={form.property_description}
                onChange={handleChange}
                required
              />
              <input
                name="property_image_link"
                type="url"
                placeholder="Image URL"
                value={form.property_image_link}
                onChange={handleChange}
                required
              />
              <input
                name="property_360_image_link"
                type="url"
                placeholder="360° Image URL"
                value={form.property_360_image_link}
                onChange={handleChange}
              />
              <select
                name="fk_property_category_id"
                value={form.fk_property_category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.property_category_id} value={c.property_category_id}>
                    {c.property_category_name}
                  </option>
                ))}
              </select>
              <input
                name="location"
                placeholder="Location name (e.g. New York)"
                value={form.location}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button type="button" className="btn-outline" onClick={closeCreate}>
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
