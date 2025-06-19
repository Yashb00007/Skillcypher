const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

// Explicitly reject GET requests for login and signup
router.get('/login', (req, res) => res.status(405).json({ msg: 'Use POST for /login' }));
router.get('/signup', (req, res) => res.status(405).json({ msg: 'Use POST for /signup' }));

module.exports = router;
