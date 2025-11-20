// ============================================
// SKILL CLASS - OOP Implementation
// ============================================

class SkillManager {
  constructor() {
    this.skills = [];
  }

  // Add skill to array
  addSkill(skill) {
    this.skills.push(skill);
  }

  // Get all skills
  getAllSkills() {
    return this.skills;
  }

  // Filter by category
  filterByCategory(category) {
    if (category === 'All') return this.skills;
    return this.skills.filter(skill => skill.category === category);
  }

  // Search skills
  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.skills.filter(skill =>
      skill.title.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Get skill by ID
  getSkillById(id) {
    return this.skills.find(skill => skill._id === id);
  }
}

// Create global instance
const skillManager = new SkillManager();
