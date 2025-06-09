import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,  Alert
} from '@mui/material';

export default function AdminDashboard() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [students, setStudents] = useState([]);
  const [resultFile, setResultFile] = useState(null);
  const [googleSheetLink, setGoogleSheetLink] = useState('');
  const [emailData, setEmailData] = useState({ toEmail: '', subject: '', message: '', resultLink: '' });
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/batches', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBatches(res.data.batches))
      .catch(console.error);
  }, [token]);

  const loadStudents = (batch) => {
    setSelectedBatch(batch);
    setMsg('');
    axios.get(`http://localhost:5000/api/admin/batch/${encodeURIComponent(batch)}/students`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStudents(res.data.students))
      .catch(console.error);
  };

  const handleUpload = () => {
    setMsg('');
    if (!selectedBatch) return setMsg('Select a batch');
    if (!resultFile && !googleSheetLink) return setMsg('Upload a PDF file or enter Google Sheet link');

    const formData = new FormData();
    if (resultFile) formData.append('resultFile', resultFile);
    if (googleSheetLink) formData.append('googleSheetLink', googleSheetLink);

    axios.post(`http://localhost:5000/api/admin/batch/${encodeURIComponent(selectedBatch)}/upload-result`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    })
      .then(res => setMsg(res.data.message))
      .catch(err => setMsg(err.response?.data?.message || 'Upload failed'));
  };

  const handleEmailChange = e => setEmailData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSendEmail = () => {
    setMsg('');
    const { toEmail, subject, message, resultLink } = emailData;
    if (!toEmail || !subject || !message || !resultLink) return setMsg('Fill all email fields');

    axios.post('http://localhost:5000/api/admin/send-email', emailData, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMsg(res.data.message))
      .catch(err => setMsg(err.response?.data?.message || 'Email sending failed'));
  };

  return (
    <>
      <Box maxWidth="lg" mx="auto" p={3}>
        <Typography variant="h4" gutterBottom>Test Admin Dashboard</Typography>

        <Box mb={3}>
          <Typography variant="h6">Batches</Typography>
          {batches.length === 0 ? <Typography>No batches available</Typography> : (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {batches.map(b => (
                <Button key={b} variant="outlined" onClick={() => loadStudents(b)}>{b}</Button>
              ))}
            </Box>
          )}
        </Box>

        {selectedBatch && (
          <>
            <Typography variant="h6" gutterBottom>Students in {selectedBatch}</Typography>
            {students.length === 0 ? (
              <Typography>No registered students in this batch</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Submitted Form</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(s => (
                      <TableRow key={s._id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.email}</TableCell>
                        <TableCell>{s.phone}</TableCell>
                        <TableCell>{new Date(s.dob).toLocaleDateString()}</TableCell>
                        <TableCell>{s.gender}</TableCell>
                        <TableCell>{s.hasSubmittedExitForm ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Box mb={3}>
              <Typography variant="h6">Upload Test Result (PDF) or Google Sheet Link</Typography>
              <input type="file" accept="application/pdf" onChange={e => setResultFile(e.target.files[0])} />
              <TextField
                label="Google Sheet Link"
                fullWidth
                margin="normal"
                value={googleSheetLink}
                onChange={e => setGoogleSheetLink(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleUpload}>Upload Result</Button>
            </Box>

            <Box>
              <Typography variant="h6">Send Email with Test Result</Typography>
              <TextField
                label="Receiver Email"
                name="toEmail"
                fullWidth
                margin="normal"
                value={emailData.toEmail}
                onChange={handleEmailChange}
              />
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                margin="normal"
                value={emailData.subject}
                onChange={handleEmailChange}
              />
              <TextField
                label="Message"
                name="message"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={emailData.message}
                onChange={handleEmailChange}
              />
              <TextField
                label="Test Result Link"
                name="resultLink"
                fullWidth
                margin="normal"
                value={emailData.resultLink}
                onChange={handleEmailChange}
              />
              <Button variant="contained" color="secondary" onClick={handleSendEmail}>Send Email</Button>
            </Box>

            {msg && <Alert sx={{ mt: 3 }} severity="info">{msg}</Alert>}
          </>
        )}
      </Box>
    </>
  );
}
