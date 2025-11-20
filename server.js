// ============================================
// SERVER.JS - Main Express Server (Node.js)
// ============================================

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillswap')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/skills', require('./routes/skills'));
app.use('/api/testimonials', require('./routes/testimonials'));

// View Routes
app.get('/', (req, res) => res.render('index', { title: 'Home' }));
app.get('/marketplace', (req, res) => res.render('marketplace', { title: 'Marketplace' }));
app.get('/add-skill', (req, res) => res.render('add-skill', { title: 'Add Skill' }));
app.get('/testimonials', (req, res) => res.render('testimonials', { title: 'Testimonials' }));
app.get('/manage', (req, res) => res.render('manage', { title: 'Manage Skills' }));

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
