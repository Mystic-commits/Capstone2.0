import React from 'react';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

const RequestCard = ({ request, isLandlord, onApprove, onReject }) => {
    return (
        <div className="feature-card" style={{ padding: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--primary)' }}>
                        {request.propertyId?.title || 'Property Unavailable'}
                    </h3>
                    {isLandlord && request.tenantId && (
                        <div style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <FiUser size={16} />
                                <strong>{request.tenantId.name}</strong>
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <FiMail size={16} />
                                {request.tenantId.email}
                            </p>
                            {request.tenantId.phone && (
                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FiPhone size={16} />
                                    {request.tenantId.phone}
                                </p>
                            )}
                        </div>
                    )}
                    <p style={{ marginBottom: '16px', fontStyle: 'italic', color: 'var(--text-main)' }}>
                        "{request.message || 'No message provided'}"
                    </p>
                    <span className={`status-badge status-${request.status}`}>
                        {request.status.toUpperCase()}
                    </span>
                </div>

                {isLandlord && request.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button onClick={() => onApprove(request._id)} className="action-btn btn-approve">Approve</button>
                        <button onClick={() => onReject(request._id)} className="action-btn btn-reject">Reject</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestCard;
