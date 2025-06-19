const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Replace with your real email and app password
const EMAIL_USER = 'teamskillcypher@gmail.com';
const EMAIL_PASS = 'YOUR_APP_PASSWORD';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
