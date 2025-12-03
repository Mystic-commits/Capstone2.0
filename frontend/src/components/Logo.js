import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
        <path d="M16 8L10 12V22L16 26L22 22V12L16 8Z" fill="white" opacity="0.9"/>
        <path d="M16 12L12 14.5V19.5L16 22L20 19.5V14.5L16 12Z" fill="white"/>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f172a"/>
            <stop offset="1" stopColor="#334155"/>
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
        RentEase
      </span>
    </Link>
  );
};

export default Logo;

