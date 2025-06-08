import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
  const [formData, setFormData] = useState({ name:'', phone:'', email:'', dob:'', batchName:'', gender:'' });
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState('');
  const batches = ['KKEM March CSA', 'KKEM March DSA', 'KKEM March MLAI', 'KKEM March FSD', 'KKEM March ST'];

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/student/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const data = res.data;
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          dob: data.dob ? new Date(data.dob).toISOString().slice(0,10) : '',
          batchName: data.batchName || '',
          gender: data.gender || ''
        });
        setSubmitted(data.hasSubmittedExitForm);
      })
      .catch(console.error);
  }, [token]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMsg('');
    axios.post('http://localhost:5000/api/student/exit-test-form', formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setMsg(res.data.message);
        setSubmitted(true);
      })
      .catch(err => {
        setMsg(err.response?.data?.message || 'Submission failed');
      });
  };

  if(submitted) {
    return (
      <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <h2>Thank you for submitting</h2>
        <p>Your exit test confirmation is received and the form is disabled.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Exit Test Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={inputStyle} />
        <input name="email" placeholder="Email" value={formData.email} disabled style={inputStyle} />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={inputStyle} />
        <select name="batchName" value={formData.batchName} onChange={handleChange} required style={inputStyle}>
          <option value="">Select Batch</option>
          {batches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px', marginTop: 10 }}>Submit</button>
        {msg && <p style={{ marginTop: 10, color: 'green' }}>{msg}</p>}
      </form>
    </div>
  );
}
const inputStyle = {
  width: '100%',
  padding: 8,
  marginBottom: 12,
  boxSizing: 'border-box'
};
