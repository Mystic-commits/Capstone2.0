const mongoose = require('mongoose');

const RentalRequestSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RentalRequest', RentalRequestSchema);
