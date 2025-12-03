const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Property = require('./models/Property');
const RentalRequest = require('./models/RentalRequest');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB for seeding'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Property.deleteMany({});
    await RentalRequest.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const landlord1 = await User.create({
      name: 'John Smith',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'landlord',
      phone: '+1-555-0101'
    });

    const landlord2 = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: hashedPassword,
      role: 'landlord',
      phone: '+1-555-0102'
    });

    const landlord3 = await User.create({
      name: 'Michael Chen',
      email: 'michael@example.com',
      password: hashedPassword,
      role: 'landlord',
      phone: '+1-555-0103'
    });

    const tenant1 = await User.create({
      name: 'Emily Davis',
      email: 'emily@example.com',
      password: hashedPassword,
      role: 'tenant',
      phone: '+1-555-0201'
    });

    const tenant2 = await User.create({
      name: 'David Wilson',
      email: 'david@example.com',
      password: hashedPassword,
      role: 'tenant',
      phone: '+1-555-0202'
    });

    console.log('👥 Created dummy users');

    const properties = [
      {
        landlordId: landlord1._id,
        title: 'Modern 2BR Apartment in Downtown',
        description: 'Beautiful modern apartment with stunning city views. Features include hardwood floors, updated kitchen, and in-unit laundry. Close to public transportation and shopping.',
        address: '123 Main Street',
        city: 'New York',
        price: 2500,
        bedrooms: 2,
        propertyType: 'apartment',
        status: 'available'
      },
      {
        landlordId: landlord1._id,
        title: 'Cozy Studio Near Central Park',
        description: 'Perfect studio apartment for professionals. Recently renovated with new appliances. Walking distance to Central Park and subway.',
        address: '456 Park Avenue',
        city: 'New York',
        price: 1800,
        bedrooms: 1,
        propertyType: 'studio',
        status: 'available'
      },
      {
        landlordId: landlord2._id,
        title: 'Spacious 3BR House with Garden',
        description: 'Lovely family home with large backyard, modern kitchen, and 2-car garage. Great neighborhood with excellent schools nearby.',
        address: '789 Oak Street',
        city: 'Brooklyn',
        price: 3200,
        bedrooms: 3,
        propertyType: 'house',
        status: 'available'
      },
      {
        landlordId: landlord2._id,
        title: 'Luxury 1BR Apartment with Balcony',
        description: 'High-end apartment building with concierge, gym, and rooftop terrace. Floor-to-ceiling windows with amazing views.',
        address: '321 Elm Drive',
        city: 'Manhattan',
        price: 3500,
        bedrooms: 1,
        propertyType: 'apartment',
        status: 'available'
      },
      {
        landlordId: landlord3._id,
        title: 'Charming 2BR House in Quiet Neighborhood',
        description: 'Well-maintained house with character. Features include fireplace, updated bathroom, and large front porch. Pet-friendly.',
        address: '654 Pine Road',
        city: 'Queens',
        price: 2200,
        bedrooms: 2,
        propertyType: 'house',
        status: 'available'
      },
      {
        landlordId: landlord3._id,
        title: 'Bright Studio in Arts District',
        description: 'Creative space perfect for artists or students. High ceilings, large windows, and exposed brick. Close to galleries and cafes.',
        address: '987 Art Street',
        city: 'Brooklyn',
        price: 1500,
        bedrooms: 1,
        propertyType: 'studio',
        status: 'available'
      },
      {
        landlordId: landlord1._id,
        title: 'Elegant 4BR Family Home',
        description: 'Stunning family home with master suite, finished basement, and two-car garage. Located in top-rated school district.',
        address: '147 Maple Lane',
        city: 'Staten Island',
        price: 4200,
        bedrooms: 4,
        propertyType: 'house',
        status: 'available'
      },
      {
        landlordId: landlord2._id,
        title: 'Contemporary 2BR with City Views',
        description: 'Sleek modern apartment with open floor plan. Features include stainless steel appliances, marble countertops, and smart home technology.',
        address: '258 Skyline Boulevard',
        city: 'Manhattan',
        price: 4800,
        bedrooms: 2,
        propertyType: 'apartment',
        status: 'available'
      }
    ];

    const createdProperties = await Property.insertMany(properties);
    console.log('🏠 Created dummy properties');

    const requests = [
      {
        propertyId: createdProperties[0]._id,
        tenantId: tenant1._id,
        landlordId: landlord1._id,
        status: 'pending',
        message: 'I am very interested in this property. I have excellent references and can move in immediately.'
      },
      {
        propertyId: createdProperties[1]._id,
        tenantId: tenant2._id,
        landlordId: landlord1._id,
        status: 'approved',
        message: 'This looks perfect for my needs. I work nearby and would love to schedule a viewing.'
      },
      {
        propertyId: createdProperties[2]._id,
        tenantId: tenant1._id,
        landlordId: landlord2._id,
        status: 'pending',
        message: 'I am looking for a family home and this seems ideal. Would like to discuss further.'
      }
    ];

    await RentalRequest.insertMany(requests);
    console.log('📝 Created dummy rental requests');

    console.log('\n✅ Seeding completed successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('   Landlord: john@example.com / password123');
    console.log('   Tenant: emily@example.com / password123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();

