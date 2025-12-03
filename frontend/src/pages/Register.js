import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'tenant',
        phone: ''
    });
    const [error, setError] = useState('');

    const { name, email, password, role, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.role === 'landlord') {
                navigate('/landlord/dashboard');
            } else {
                navigate('/tenant/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Join RentEase</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>I am a:</label>
                    <select name="role" value={role} onChange={onChange}>
                        <option value="tenant">Tenant (Looking for a home)</option>
                        <option value="landlord">Landlord (Listing a property)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="nav-btn btn-primary btn-block">Register</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
