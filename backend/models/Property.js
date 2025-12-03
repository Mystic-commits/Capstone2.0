const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    propertyType: { type: String, required: true }, // 'apartment', 'house', 'studio'
    status: { type: String, default: 'available' }, // 'available', 'rented'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
