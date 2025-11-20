// ============================================
// SKILLS ROUTES - CRUD Operations
// ============================================

const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// CREATE - Add new skill
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.json({ success: true, skill });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// READ - Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json({ success: true, skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ - Get single skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.json({ success: true, skill });
  } catch (err) {
    res.status(404).json({ success: false, error: 'Skill not found' });
  }
});

// UPDATE - Update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, skill });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE - Delete skill
router.delete('/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
