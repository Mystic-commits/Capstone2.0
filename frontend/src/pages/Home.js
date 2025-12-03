import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiZap, FiShield } from 'react-icons/fi';
import houseBackground from '../assets/house-background.jpg';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section 
                className="hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(248, 250, 252, 0.9)), url(${houseBackground})`
                }}
            >
                <h1>Find Your Perfect Home <br /> <span style={{ color: 'var(--text-secondary)', fontSize: '0.6em', fontWeight: '500' }}>Without the Hassle</span></h1>
                <p>Discover a seamless rental experience with verified listings, direct landlord communication, and secure digital agreements.</p>
                <div className="hero-buttons">
                    <Link to="/tenant/properties" className="btn-large btn-primary">Browse Properties</Link>
                    <Link to="/register" className="btn-large btn-secondary">List Your Property</Link>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <h2 className="section-title">Why Choose RentEase?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiSearch size={40} />
                        </div>
                        <h3>Smart Search</h3>
                        <p>Filter properties by location, price, and amenities to find exactly what you need.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiZap size={40} />
                        </div>
                        <h3>Instant Requests</h3>
                        <p>Connect directly with landlords and get approved faster than ever.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiShield size={40} />
                        </div>
                        <h3>Verified Listings</h3>
                        <p>Every property is verified to ensure a safe and secure rental journey.</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats" style={{ background: 'var(--primary)', color: 'white' }}>
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number" style={{ color: 'var(--accent)' }}>10+</div>
                        <div className="stat-label">Active Listings</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" style={{ color: 'var(--accent)' }}>5+</div>
                        <div className="stat-label">Happy Tenants</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" style={{ color: 'var(--accent)' }}>4.9/5</div>
                        <div className="stat-label">User Rating</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta" style={{ background: 'white', padding: '100px 5%' }}>
                <div style={{
                    background: 'var(--gradient-primary)',
                    borderRadius: '24px',
                    padding: '60px',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Move In?</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>Join thousands of users finding their dream homes on RentEase.</p>
                    <Link to="/register" className="btn-large" style={{ background: 'white', color: 'var(--primary)' }}>Get Started Now</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" style={{ background: 'var(--background)', color: 'var(--text-secondary)', padding: '60px 5%' }}>
                <div className="footer-links">
                    <a href="#" style={{ color: 'var(--text-main)' }}>About Us</a>
                    <a href="#" style={{ color: 'var(--text-main)' }}>Contact</a>
                    <a href="#" style={{ color: 'var(--text-main)' }}>Terms of Service</a>
                    <a href="#" style={{ color: 'var(--text-main)' }}>Privacy Policy</a>
                </div>
                <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>© 2024 RentEase. Built for better living.</p>
            </footer>
        </div>
    );
};

export default Home;
