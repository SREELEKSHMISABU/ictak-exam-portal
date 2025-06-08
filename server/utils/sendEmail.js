const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // example service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text
  });
}

module.exports = sendEmail;