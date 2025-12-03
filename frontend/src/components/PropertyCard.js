import React from 'react';
import { FiMapPin, FiHome, FiSquare } from 'react-icons/fi';

const PropertyCard = ({ property, isLandlord, onEdit, onDelete, onRequest }) => {
    const getPropertyImage = () => {
        const images = [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
            'https://images.unsplash.com/photo-1568605119132-0a6e1091bffb?w=800',
            'https://images.unsplash.com/photo-1560449752-91533a2d238e?w=800'
        ];
        return images[Math.abs(property.title?.charCodeAt(0) || 0) % images.length];
    };

    return (
        <div className="property-card">
            <div style={{ position: 'relative' }}>
                <img
                    src={getPropertyImage()}
                    alt={property.title}
                    className="property-image"
                />
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: property.status === 'available' ? '#16a34a' : '#dc2626',
                        display: 'inline-block'
                    }}></span>
                    {property.status === 'available' ? 'Available' : 'Rented'}
                </div>
            </div>

            <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiMapPin size={16} />
                    {property.address}, {property.city}
                </p>

                <div className="property-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiHome size={14} />
                        {property.bedrooms} Beds
                    </span>
                    <span style={{ textTransform: 'capitalize' }}>{property.propertyType}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiSquare size={14} />
                        1200 sqft
                    </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <p className="property-price">₹{property.price}<span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>/mo</span></p>

                    {isLandlord ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => onEdit(property)} className="action-btn btn-edit">Edit</button>
                            <button onClick={() => onDelete(property._id)} className="action-btn btn-delete">Delete</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onRequest(property._id)}
                            className="nav-btn btn-primary"
                            style={{ borderRadius: '8px', padding: '10px 20px' }}
                        >
                            Request
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
