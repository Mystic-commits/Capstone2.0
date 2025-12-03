const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const RentalRequest = require('../models/RentalRequest');
const Property = require('../models/Property');

router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'tenant') {
            return res.status(403).json({ message: 'Access denied. Tenants only.' });
        }

        const { propertyId, message } = req.body;
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const newRequest = new RentalRequest({
            propertyId,
            tenantId: req.user.id,
            landlordId: property.landlordId,
            message
        });

        const request = await newRequest.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/my-requests', auth, async (req, res) => {
    try {
        const requests = await RentalRequest.find({ tenantId: req.user.id })
            .populate('propertyId', 'title address price')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/incoming', auth, async (req, res) => {
    try {
        if (req.user.role !== 'landlord') {
            return res.status(403).json({ message: 'Access denied. Landlords only.' });
        }

        const requests = await RentalRequest.find({ landlordId: req.user.id })
            .populate('propertyId', 'title')
            .populate('tenantId', 'name email phone')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/approve', auth, async (req, res) => {
    try {
        let request = await RentalRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        if (request.landlordId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        request.status = 'approved';
        await request.save();

        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/reject', auth, async (req, res) => {
    try {
        let request = await RentalRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        if (request.landlordId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        request.status = 'rejected';
        await request.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
