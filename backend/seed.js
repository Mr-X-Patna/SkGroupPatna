const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
require('dotenv').config();

const seedAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding.');

        // Clear existing admin users (optional)
        await User.deleteMany({ isAdmin: true });

        const admins = [
            {
                username: 'admin1',
                email: 'admin1@skgroup.com',
                password: await bcrypt.hash('Admin@123', 10),
                isAdmin: true,
                isVerified: true,
            },
            {
                username: 'admin2',
                email: 'admin2@skgroup.com',
                password: await bcrypt.hash('Admin@123', 10),
                isAdmin: true,
                isVerified: true,
            },
        ];

        await User.insertMany(admins);
        console.log('✅ 2 admin accounts created successfully!');
        console.log('   Usernames: admin1, admin2');
        console.log('   Password: Admin@123');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        process.exit(1);
    }
};

seedAdmins();