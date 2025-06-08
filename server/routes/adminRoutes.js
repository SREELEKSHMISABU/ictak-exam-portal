const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../utils/sendEmail');

const upload = multer({ dest: 'uploads/' });

function adminOnly(req, res, next) {
  if(req.user.role !== 'admin')
    return res.status(403).json({ message: 'Admin access only' });
  next();
}

router.get('/batches', authenticateToken, adminOnly, async (req, res) => {
  try {
    const batches = await User.distinct('batchName', { role:'student', eligible:true });
    res.json({ batches });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/batch/:batchName/students', authenticateToken, adminOnly, async (req, res) => {
  try {
    const batchName = req.params.batchName;
    const students = await User.find({ role:'student', batchName, eligible:true })
      .select('name email phone dob gender hasSubmittedExitForm');
    res.json({ students });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/batch/:batchName/upload-result', authenticateToken, adminOnly, upload.single('resultFile'), async (req, res) => {
  try {
    const batchName = req.params.batchName;
    const { googleSheetLink } = req.body;
    let resultUrl = null;

    if(req.file) {
      const ext = path.extname(req.file.originalname);
      const newFileName = `result_${batchName.replace(/\s+/g,'_')}_${Date.now()}${ext}`;
      const newPath = path.join(__dirname, '..', 'uploads', newFileName);
      fs.renameSync(req.file.path, newPath);
      resultUrl = `/uploads/${newFileName}`;
    } else if (googleSheetLink) {
      if(!googleSheetLink.startsWith('http'))
        return res.status(400).json({ message: 'Invalid Google Sheet Link' });
      resultUrl = googleSheetLink;
    } else {
      return res.status(400).json({ message: 'Upload file or provide Google Sheet link' });
    }

    // Here you might save the resultUrl to DB if needed
    res.json({ message: 'Result uploaded', resultUrl });
  } catch(err) {
    res.status(500).json({ message: 'Server error uploading result' });
  }
});

router.post('/send-email', authenticateToken, adminOnly, async (req, res) => {
  try {
    const { toEmail, subject, message, resultLink } = req.body;
    if(!toEmail || !subject || !message || !resultLink)
      return res.status(400).json({ message: 'All fields are required' });

    const composedMsg = message + "\n\nTest result link: " + resultLink;
    await sendEmail(toEmail, subject, composedMsg);

    res.json({ message: 'Email sent successfully!' });
  } catch(err) {
    res.status(500).json({ message: 'Server error sending email' });
  }
});

module.exports = router;