import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMail, FiArrowRight } from 'react-icons/fi';

const LandlordDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome back, {user?.name}!</h1>
                    <p>Manage your properties and rental requests.</p>
                </div>
                <Link to="/landlord/add-property" className="btn-large btn-primary">Add New Property</Link>
            </div>

            <div className="dashboard-grid">
                <div className="feature-card" style={{ textAlign: 'left', padding: '32px' }}>
                    <div style={{ marginBottom: '16px', color: 'var(--primary)' }}>
                        <FiHome size={40} />
                    </div>
                    <h3>My Properties</h3>
                    <p style={{ marginBottom: '24px' }}>View and manage your listed properties and their availability.</p>
                    <Link to="/landlord/properties" className="nav-btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        Manage Properties <FiArrowRight />
                    </Link>
                </div>
                <div className="feature-card" style={{ textAlign: 'left', padding: '32px' }}>
                    <div style={{ marginBottom: '16px', color: 'var(--primary)' }}>
                        <FiMail size={40} />
                    </div>
                    <h3>Rental Requests</h3>
                    <p style={{ marginBottom: '24px' }}>View incoming requests from potential tenants and take action.</p>
                    <Link to="/landlord/requests" className="nav-btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        View Requests <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandlordDashboard;
