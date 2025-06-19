//B6f2cuZxWA6Lszep
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

const authRoutes = require('./Routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./Routes/user');
app.use('/api/user', userRoutes);

const upcomingRoutes = require('./Routes/upcoming');
app.use('/api/upcoming', upcomingRoutes);

const subadminRoutes = require('./Routes/subadmin');
app.use('/api/subadmin', subadminRoutes);

const courseRoutes = require('./Routes/course');
app.use('/api/course', courseRoutes);

const contactRoutes = require('./Routes/contact');
app.use('/api/contact', contactRoutes);

app.get('/ping', (req, res) => {
  res.send('Hello, World!');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});