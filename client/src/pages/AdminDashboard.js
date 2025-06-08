import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [students, setStudents] = useState([]);
  const [resultFile, setResultFile] = useState(null);
  const [googleSheetLink, setGoogleSheetLink] = useState('');
  const [emailData, setEmailData] = useState({ toEmail:'', subject:'', message:'', resultLink:'' });
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/batches', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBatches(res.data.batches))
      .catch(console.error);
  }, [token]);

  const loadStudents = batch => {
    setSelectedBatch(batch);
    setMsg('');
    axios.get(`http://localhost:5000/api/admin/batch/${encodeURIComponent(batch)}/students`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setStudents(res.data.students))
      .catch(console.error);
  };

  const handleUpload = () => {
    setMsg('');
    if(!selectedBatch) { setMsg('Select a batch'); return; }
    if(!resultFile && !googleSheetLink) { setMsg('Upload a PDF file or enter Google Sheet link'); return; }

    const formData = new FormData();
    if(resultFile) formData.append('resultFile', resultFile);
    if(googleSheetLink) formData.append('googleSheetLink', googleSheetLink);

    axios.post(`http://localhost:5000/api/admin/batch/${encodeURIComponent(selectedBatch)}/upload-result`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    }).then(res => setMsg(res.data.message))
      .catch(err => setMsg(err.response?.data?.message || 'Upload failed'));
  };

  const handleEmailChange = e => setEmailData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSendEmail = () => {
    setMsg('');
    const { toEmail, subject, message, resultLink } = emailData;
    if(!toEmail || !subject || !message || !resultLink) {
      setMsg('Fill all email fields');
      return;
    }
    axios.post('http://localhost:5000/api/admin/send-email', emailData, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMsg(res.data.message))
      .catch(err => setMsg(err.response?.data?.message || 'Email sending failed'));
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h2>Test Admin Dashboard</h2>

      <h3>Batches:</h3>
      {batches.length === 0 ? <p>No batches available</p> : (
        <ul>
          {batches.map(b => <li key={b}><button onClick={() => loadStudents(b)}>{b}</button></li>)}
        </ul>
      )}

      {selectedBatch && <>
        <h3>Students in {selectedBatch}:</h3>
        {students.length === 0 ? <p>No registered students in this batch</p> :
          <table border="1" cellPadding="6" cellSpacing="0" style={{marginBottom: 20, width: '100%', textAlign:'left'}}>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>DOB</th><th>Gender</th><th>Submitted Form</th></tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{new Date(s.dob).toLocaleDateString()}</td>
                  <td>{s.gender}</td>
                  <td>{s.hasSubmittedExitForm ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }

        <div>
          <h4>Upload Test Result (PDF) or Provide Google Sheet Link</h4>
          <input type="file" accept="application/pdf" onChange={e => setResultFile(e.target.files[0])} />
          <input type="url" placeholder="Google Sheet Link" value={googleSheetLink} onChange={e => setGoogleSheetLink(e.target.value)} style={{width: '100%', marginTop: 8, padding: 6}} />
          <button onClick={handleUpload} style={{ marginTop: 8, padding: '8px 16px' }}>Upload Result</button>
        </div>

        <div style={{ marginTop: 20 }}>
          <h4>Send Email with Test Result</h4>
          <input type="email" name="toEmail" placeholder="Receiver Email" value={emailData.toEmail} onChange={handleEmailChange} style={inputEmailStyle} />
          <input type="text" name="subject" placeholder="Subject" value={emailData.subject} onChange={handleEmailChange} style={inputEmailStyle} />
          <textarea name="message" placeholder="Message" rows="4" value={emailData.message} onChange={handleEmailChange} style={inputEmailStyle} />
          <input type="url" name="resultLink" placeholder="Test Result Link" value={emailData.resultLink} onChange={handleEmailChange} style={inputEmailStyle} />
          <button onClick={handleSendEmail} style={{ padding: '8px 16px', marginTop: 8 }}>Send Email</button>
        </div>
        {msg && <p style={{ marginTop: 12, color: 'green' }}>{msg}</p>}
      </>}
    </div>
  );
}

const inputEmailStyle = {
  width: '100%',
  padding: 8,
  margin: '6px 0',
  boxSizing: 'border-box'
};