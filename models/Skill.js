// ============================================
// SKILL MODEL - MongoDB Schema
// ============================================

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: String, required: true },
  rating: { type: Number, default: 0 },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', skillSchema);
