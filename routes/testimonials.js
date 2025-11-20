// ============================================
// TESTIMONIALS ROUTES
// ============================================

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get testimonials from JSON file
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/testimonials.json')));
  res.json({ success: true, testimonials: data.testimonials });
});

module.exports = router;
