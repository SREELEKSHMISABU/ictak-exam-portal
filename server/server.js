require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./server/routes/authRoutes');
const studentRoutes = require('./server/routes/studentRoutes');
const adminRoutes = require('./server/routes/adminRoutes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb+srv://ictak:ictak123@ictakcluster.kzi8eqp.mongodb.net/?retryWrites=true&w=majority&appName=ICTAKCluster", { useNewUrlParser:true, useUnifiedTopology:true })
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('ICTAK Exam Registration Portal API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));