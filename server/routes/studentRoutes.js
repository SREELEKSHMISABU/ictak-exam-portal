const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    if(req.user.role !== 'student') return res.status(403).json({ message: 'Access denied' });
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      name: user.name,
      phone: user.phone,
      email: user.email,
      dob: user.dob,
      batchName: user.batchName,
      gender: user.gender,
      hasSubmittedExitForm: user.hasSubmittedExitForm
    });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/exit-test-form', authenticateToken, async (req, res) => {
  try {
    if(req.user.role !== 'student') return res.status(403).json({ message: 'Access denied' });
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    if(user.hasSubmittedExitForm)
      return res.status(400).json({ message: 'Form already submitted' });

    const { name, phone, dob, batchName, gender } = req.body;
    if(!name || !phone || !dob || !batchName || !gender)
      return res.status(400).json({ message: 'All fields are required' });

    user.name = name;
    user.phone = phone;
    user.dob = new Date(dob);
    user.batchName = batchName;
    user.gender = gender;
    user.hasSubmittedExitForm = true;

    await user.save();
    res.json({ message: 'Exit test confirmation submitted' });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;