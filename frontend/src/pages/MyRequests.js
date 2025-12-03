import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestCard from '../components/RequestCard';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/requests/my-requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <div className="dashboard-container"><div className="loading">Loading...</div></div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>My Rental Requests</h1>
                    <p>Track the status of your rental applications</p>
                </div>
            </div>
            {requests.length === 0 ? (
                <div className="empty-state">
                    <h3>No requests yet</h3>
                    <p>Start browsing properties to submit rental requests.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {requests.map(request => (
                        <RequestCard key={request._id} request={request} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;
