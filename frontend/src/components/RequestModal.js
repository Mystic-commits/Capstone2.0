import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const RequestModal = ({ isOpen, onClose, onSubmit, propertyTitle, loading }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setMessage('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalMessage = message.trim() || "I am interested in renting this property.";
        onSubmit(finalMessage);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Send Rental Request</h2>
                    <button onClick={onClose} className="modal-close-btn" disabled={loading}>
                        <FiX size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <p className="modal-property-title">{propertyTitle}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Message to Landlord</label>
                            <textarea
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="I am interested in renting this property. Please let me know if it's still available..."
                                rows="5"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="modal-actions">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-secondary"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestModal;

