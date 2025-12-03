const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Property = require('../models/Property');

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/my-properties', auth, async (req, res) => {
    try {
        if (req.user.role !== 'landlord') {
            return res.status(403).json({ message: 'Access denied. Landlords only.' });
        }
        const properties = await Property.find({ landlordId: req.user.id }).sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'landlord') {
            return res.status(403).json({ message: 'Access denied. Landlords only.' });
        }

        const newProperty = new Property({
            landlordId: req.user.id,
            ...req.body
        });

        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        if (property.landlordId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        property = await Property.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        if (property.landlordId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await property.deleteOne();
        res.json({ message: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
