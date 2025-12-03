import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiFileText, FiArrowRight } from 'react-icons/fi';

const TenantDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome back, {user?.name}!</h1>
                    <p>Find your next home or manage your requests.</p>
                </div>
                <Link to="/tenant/properties" className="btn-large btn-primary">Browse Properties</Link>
            </div>

            <div className="dashboard-grid">
                <div className="feature-card" style={{ textAlign: 'left', padding: '32px' }}>
                    <div style={{ marginBottom: '16px', color: 'var(--primary)' }}>
                        <FiHome size={40} />
                    </div>
                    <h3>Browse Properties</h3>
                    <p style={{ marginBottom: '24px' }}>Explore our wide range of available properties in top locations.</p>
                    <Link to="/tenant/properties" className="nav-btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        View All <FiArrowRight />
                    </Link>
                </div>
                <div className="feature-card" style={{ textAlign: 'left', padding: '32px' }}>
                    <div style={{ marginBottom: '16px', color: 'var(--primary)' }}>
                        <FiFileText size={40} />
                    </div>
                    <h3>My Requests</h3>
                    <p style={{ marginBottom: '24px' }}>Check the status of your rental applications and history.</p>
                    <Link to="/tenant/requests" className="nav-btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        View Requests <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;
