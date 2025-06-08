const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ['student', 'admin'], required: true },
  eligible: { type: Boolean, default: false }, // students only
  name: { type: String },
  phone: { type: String },
  dob: { type: Date },
  batchName: {
    type: String,
    enum: ['KKEM March CSA', 'KKEM March DSA', 'KKEM March MLAI', 'KKEM March FSD', 'KKEM March ST'],
  },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  hasSubmittedExitForm: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);