require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect("mongodb+srv://ictak:ictak123@ictakcluster.kzi8eqp.mongodb.net/?retryWrites=true&w=majority&appName=ICTAKCluster", { useNewUrlParser:true, useUnifiedTopology:true });
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    const adminPass = await bcrypt.hash('Admin123!', 10);
    const studentPass = await bcrypt.hash('Student123!', 10);
    const studentPass2 = await bcrypt.hash('Student@123', 10);

    await User.create([
      { email: 'admin@gmail.com', password: adminPass, role: 'admin', eligible: true },
      { email: 'student1@gmail.com', password: studentPass, role: 'student', eligible: true },
      { email: 'student3@gmail.com', password: studentPass2, role: 'student', eligible: true },
      { email: 'student2@gmail.com', password: studentPass, role: 'student', eligible: false }
    ]);
    console.log('Seed completed');
    await mongoose.disconnect();
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

seed();