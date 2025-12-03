const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('💡 Make sure MongoDB is running on localhost:27017');
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.json({ 
    message: 'RentEase API Server',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      properties: '/api/properties',
      requests: '/api/requests'
    }
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/requests', require('./routes/requests'));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server Error:', e);
  }
  process.exit(1);
});

