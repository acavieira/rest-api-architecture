const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dummy user for demonstration
const user = {
  id: 1,
  username: 'admin',
  password: bcrypt.hashSync('password123', 8) // hashed password
};

// POST /api/v1/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
