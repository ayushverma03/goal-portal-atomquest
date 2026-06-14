import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from './models/User.js';
import Cycle from './models/Cycle.js';
import Goal from './models/Goal.js';
import Achievement from './models/Achievement.js';
import Checkin from './models/Checkin.js';
import AuditLog from './models/AuditLog.js';

dotenv.config({ path: './server/.env' });

const seedDatabase = async () => {
  try {
    console.log('⏳ Connecting to database for seeding data...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected safely to database.');

    console.log('🧹 Purging older collections...');
    await User.deleteMany();
    await Cycle.deleteMany();
    await Goal.deleteMany();
    await Achievement.deleteMany();
    await Checkin.deleteMany();
    await AuditLog.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const standardHashedPassword = await bcrypt.hash('Demo@1234', salt);

    console.log('👤 Seeding user roles and administrative trees...');

    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@demo.com',
      password: standardHashedPassword,
      role: 'admin',
      department: 'Human Resources',
    });

    
    const managerUser = await User.create({
      name: 'Sarah Jenkins',
      email: 'manager@demo.com',
      password: standardHashedPassword,
      role: 'manager',
      managerId: adminUser._id,
      department: 'Engineering',
    });

  
    const employeeOne = await User.create({
      name: 'Alex Rivera',
      email: 'employee@demo.com',
      password: standardHashedPassword,
      role: 'employee',
      managerId: managerUser._id,
      department: 'Engineering',
    });

    const employeeTwo = await User.create({
      name: 'Jordan Lee',
      email: 'employee2@demo.com',
      password: standardHashedPassword,
      role: 'employee',
      managerId: managerUser._id,
      department: 'Engineering',
    });

    console.log('📅 Seeding baseline evaluation performance cycle...');

   
    const openDate = new Date();
    openDate.setDate(openDate.getDate() - 5); // Window opened 5 days ago

    const closeDate = new Date();
    closeDate.setDate(closeDate.getDate() + 25); // Window closes in 25 days

    await Cycle.create({
      name: 'FY 2026 Annual Strategy Cycle',
      phase: 'Q1', // Set to Q1 to pass achievement logging gate check-ins
      windowOpen: openDate,
      windowClose: closeDate,
      isActive: true,
    });

    console.log('\n======================================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log('🔑 Use the following credentials to access the system:');
    console.log('   All profiles share the password: Demo@1234\n');
    console.log(`   👉 Admin:     ${adminUser.email}`);
    console.log(`   👉 Manager:   ${managerUser.email}`);
    console.log(`   👉 Employee:  ${employeeOne.email}`);
    console.log(`   👉 Employee 2: ${employeeTwo.email}`);
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Critical failure running database seeder script:', error.message);
    process.exit(1);
  }
};

seedDatabase();