const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://capstone2-0-n4iy.onrender.com'
    : 'http://localhost:5000';

export default API_BASE_URL;

