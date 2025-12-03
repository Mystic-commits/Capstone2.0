import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const MyProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/properties/my-properties', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(properties.filter(p => p._id !== id));
        } catch (err) {
            alert('Error deleting property');
        }
    };

    const handleEdit = (property) => {
        navigate(`/landlord/edit-property/${property._id}`, { state: { property } });
    };

    if (loading) return <div className="dashboard-container"><div className="loading">Loading...</div></div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>My Properties</h1>
                    <p>Manage your listed properties</p>
                </div>
            </div>
            {properties.length === 0 ? (
                <div className="empty-state">
                    <h3>No properties listed yet</h3>
                    <p>Start by adding your first property.</p>
                </div>
            ) : (
                <div className="properties-grid">
                    {properties.map(property => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                            isLandlord={true}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProperties;
