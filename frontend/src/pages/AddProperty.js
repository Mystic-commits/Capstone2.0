import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddProperty = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = !!location.state?.property;
    const existingProperty = location.state?.property || {};

    const [formData, setFormData] = useState({
        title: existingProperty.title || '',
        description: existingProperty.description || '',
        address: existingProperty.address || '',
        city: existingProperty.city || '',
        price: existingProperty.price || '',
        bedrooms: existingProperty.bedrooms || '',
        propertyType: existingProperty.propertyType || 'apartment'
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/properties/${existingProperty._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/properties', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/landlord/properties');
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving property. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                {isEdit ? 'Edit Property' : 'Add New Property'}
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Property Title</label>
                    <input type="text" name="title" value={formData.title} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={onChange} required rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Price (₹/month)</label>
                    <input type="number" name="price" value={formData.price} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Bedrooms</label>
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Property Type</label>
                    <select name="propertyType" value={formData.propertyType} onChange={onChange}>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="studio">Studio</option>
                    </select>
                </div>
                <button type="submit" className="nav-btn btn-primary btn-block">
                    {isEdit ? 'Update Property' : 'Add Property'}
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
