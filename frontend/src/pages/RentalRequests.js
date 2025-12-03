import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestCard from '../components/RequestCard';

const RentalRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/requests/incoming', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = status === 'approved' ? 'approve' : 'reject';
            await axios.put(`http://localhost:5000/api/requests/${id}/${endpoint}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchRequests(); // Refresh list
        } catch (err) {
            alert('Error updating request');
        }
    };

    if (loading) return <div className="dashboard-container"><div className="loading">Loading...</div></div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Incoming Rental Requests</h1>
                    <p>Review and manage requests from potential tenants</p>
                </div>
            </div>
            {requests.length === 0 ? (
                <div className="empty-state">
                    <h3>No requests yet</h3>
                    <p>You'll see rental requests here when tenants apply for your properties.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {requests.map(request => (
                        <RequestCard
                            key={request._id}
                            request={request}
                            isLandlord={true}
                            onApprove={() => handleStatusUpdate(request._id, 'approved')}
                            onReject={() => handleStatusUpdate(request._id, 'rejected')}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RentalRequests;
