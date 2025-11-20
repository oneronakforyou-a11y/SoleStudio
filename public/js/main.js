// ============================================
// MAIN.JS - Client-side JavaScript
// ============================================

// Load skills when marketplace page loads
if (document.getElementById('skillsGrid')) {
  loadMarketplaceSkills();
}

// Load testimonials when testimonials page loads
if (document.getElementById('testimonialsGrid')) {
  loadTestimonials();
}

// Load manage page skills
if (document.getElementById('manageSkillsList')) {
  loadManageSkills();
}

// ============= MARKETPLACE FUNCTIONS =============

async function loadMarketplaceSkills() {
  try {
    const response = await fetch('/api/skills');
    const data = await response.json();

    // Use OOP class to manage skills
    data.skills.forEach(skill => skillManager.addSkill(skill));
    displaySkills(skillManager.getAllSkills());
  } catch (err) {
    console.error('Error loading skills:', err);
  }
}

function displaySkills(skills) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = skills.map(skill => `
    <div class="skill-card" onclick="showSkillModal('${skill._id}')">
      <h3>${skill.title}</h3>
      <p class="teacher">by ${skill.teacher}</p>
      <p class="description">${skill.description}</p>
      <div class="meta">
        <span class="rating">★ ${skill.rating || 0}</span>
        <span>${skill.duration} min</span>
      </div>
      <span class="badge">${skill.category}</span>
    </div>
  `).join('');
}

// Search function
function searchSkills() {
  const query = document.getElementById('searchBox').value;
  const filtered = skillManager.search(query);
  displaySkills(filtered);
}

// Filter by category
function filterByCategory() {
  const category = document.getElementById('categoryFilter').value;
  const filtered = skillManager.filterByCategory(category);
  displaySkills(filtered);
}

// Show skill modal
function showSkillModal(id) {
  const skill = skillManager.getSkillById(id);
  if (!skill) return;

  const modal = document.getElementById('skillModal');
  document.getElementById('modalBody').innerHTML = `
    <h2>${skill.title}</h2>
    <p><strong>Teacher:</strong> ${skill.teacher}</p>
    <p><strong>Category:</strong> ${skill.category}</p>
    <p><strong>Duration:</strong> ${skill.duration} minutes</p>
    <p><strong>Rating:</strong> ★ ${skill.rating || 0}</p>
    <p>${skill.description}</p>
  `;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('skillModal').classList.remove('active');
}

// ============= TESTIMONIALS FUNCTIONS =============

async function loadTestimonials() {
  try {
    const response = await fetch('/api/testimonials');
    const data = await response.json();
    displayTestimonials(data.testimonials);
  } catch (err) {
    console.error('Error loading testimonials:', err);
  }
}

function displayTestimonials(testimonials) {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = testimonials.map(test => {
    const initials = test.name.split(' ').map(n => n[0]).join('');
    const stars = '★'.repeat(test.rating);
    return `
      <div class="testimonial-card">
        <div class="header-row">
          <div class="avatar">${initials}</div>
          <div>
            <div class="name">${test.name}</div>
            <div class="rating">${stars}</div>
          </div>
        </div>
        <p class="review">"${test.review}"</p>
      </div>
    `;
  }).join('');
}

// ============= ADD SKILL FORM =============

async function submitSkill(event) {
  event.preventDefault();
  const form = event.target;
  const formData = {
    title: form.title.value,
    category: form.category.value,
    description: form.description.value,
    teacher: form.teacher.value,
    duration: parseInt(form.duration.value)
  };

  try {
    const response = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (data.success) {
      alert('Skill added successfully!');
      form.reset();
      window.location.href = '/marketplace';
    }
  } catch (err) {
    alert('Error adding skill');
  }
}

// ============= MANAGE SKILLS (CRUD) =============

async function loadManageSkills() {
  try {
    const response = await fetch('/api/skills');
    const data = await response.json();
    displayManageSkills(data.skills);
  } catch (err) {
    console.error('Error loading skills:', err);
  }
}

function displayManageSkills(skills) {
  const list = document.getElementById('manageSkillsList');
  list.innerHTML = skills.map(skill => `
    <div class="manage-card">
      <h3>${skill.title}</h3>
      <p>${skill.description.substring(0, 100)}...</p>
      <div class="actions">
        <button onclick="editSkill('${skill._id}')" class="btn-edit">Edit</button>
        <button onclick="deleteSkill('${skill._id}')" class="btn-delete">Delete</button>
      </div>
    </div>
  `).join('');
}

async function deleteSkill(id) {
  if (!confirm('Delete this skill?')) return;

  try {
    const response = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    const data = await response.json();

    if (data.success) {
      alert('Skill deleted!');
      loadManageSkills();
    }
  } catch (err) {
    alert('Error deleting skill');
  }
}

function editSkill(id) {
  // Simple redirect to edit page (you can enhance this)
  alert('Edit functionality - Redirect to edit form with ID: ' + id);
}
