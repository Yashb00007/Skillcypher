const express = require('express');
const router = express.Router();
const { auth } = require('../Middlewares/auth');
const User = require('../Models/User');

// In-memory store for upcoming classes (for demo; use DB in production)
let upcomingClasses = [];

// Admin: Add an upcoming class
router.post('/upcoming', auth, async (req, res) => {
  // Only allow admin (add your admin check here)
  // For demo, allow all
  const { title, date, courseId } = req.body;
  if (!title || !date || !courseId) return res.status(400).json({ msg: 'All fields required' });
  upcomingClasses.push({ title, date, courseId });
  res.json({ msg: 'Upcoming class added', upcomingClasses });
});

// Get all upcoming classes
router.get('/upcoming', auth, async (req, res) => {
  res.json({ upcomingClasses });
});

module.exports = router;
