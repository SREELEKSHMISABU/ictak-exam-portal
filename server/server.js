const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // or correct path if different

const app = express(); // ✅ Define app before using it

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/authRoutes', authRoutes); // ✅ Use app after it's defined

// Connect to MongoDB
mongoose.connect("mongodb+srv://ictak:ictak123@ictakcluster.kzi8eqp.mongodb.net/?retryWrites=true&w=majority&appName=ICTAKCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => {
    console.log('🚀 Server running on port 5000');
  });
})
.catch((err) => {
  console.error(' MongoDB Error:', err);
});
