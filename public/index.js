// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact Form Handling with Database Integration
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMsg = document.getElementById("formMsg");

  // Reset message styling
  formMsg.className = "form-message";

  if (name && email && message) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMsg.classList.add("error");
      formMsg.textContent = "Please enter a valid email address.";
      return;
    }

    try {
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Send to database
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.ok) {
        formMsg.classList.add("success");
        formMsg.textContent = "Thank you! Your message has been sent successfully.";
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formMsg.classList.add("hidden");
        }, 5000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
    } catch (error) {
      formMsg.classList.add("error");
      formMsg.textContent = error.message || "Failed to send message. Please try again.";
    } finally {
      // Reset button state
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  } else {
    formMsg.classList.add("error");
    formMsg.textContent = "Please fill out all fields.";
  }
});

// User Authentication Functions
const auth = {
  token: localStorage.getItem('authToken'),
  user: JSON.parse(localStorage.getItem('user')),

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (response.ok) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, data };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (response.ok) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, data };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    updateAuthUI();
  },

  isAuthenticated() {
    return !!this.token;
  }
};

// Update UI based on authentication status
function updateAuthUI() {
  const authButtons = document.querySelectorAll('.auth-button');
  const userInfo = document.querySelector('.user-info');
  
  if (auth.isAuthenticated()) {
    authButtons.forEach(btn => btn.style.display = 'none');
    if (userInfo) {
      userInfo.style.display = 'block';
      userInfo.innerHTML = `
        <span>Welcome, ${auth.user.firstName}!</span>
        <button onclick="auth.logout()" class="btn btn-secondary">Logout</button>
      `;
    }
  } else {
    authButtons.forEach(btn => btn.style.display = 'inline-block');
    if (userInfo) {
      userInfo.style.display = 'none';
    }
  }
}

// Course Management Functions
const courseAPI = {
  async getFeaturedCourses() {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/featured`);
      const courses = await response.json();
      return courses;
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      return [];
    }
  },

  async getAllCourses(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/courses?${queryString}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { courses: [], totalPages: 0, currentPage: 1, totalCourses: 0 };
    }
  },

  async getCourseById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${id}`);
      const course = await response.json();
      return course;
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }
};

// Load featured courses on page load
async function loadFeaturedCourses() {
  const courses = await courseAPI.getFeaturedCourses();
  if (courses.length > 0) {
    // You can update the services section to show real courses
    console.log('Featured courses loaded:', courses);
  }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    if (this.type === 'submit') return; // Don't animate submit buttons
    
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service-card, .stat-item, .about-text, .contact-info');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Initialize authentication UI
  updateAuthUI();
  
  // Load featured courses
  loadFeaturedCourses();

  // Modal elements
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const closeRegisterModal = document.getElementById('closeRegisterModal');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginMessage = document.getElementById('loginMessage');
  const registerMessage = document.getElementById('registerMessage');

  // Show/hide modal helpers
  function showModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function hideModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open modals
  if (loginBtn) loginBtn.addEventListener('click', () => showModal(loginModal));
  if (registerBtn) registerBtn.addEventListener('click', () => showModal(registerModal));
  // Close modals
  if (closeLoginModal) closeLoginModal.addEventListener('click', () => hideModal(loginModal));
  if (closeRegisterModal) closeRegisterModal.addEventListener('click', () => hideModal(registerModal));
  // Switch between modals
  if (showRegister) showRegister.addEventListener('click', (e) => { e.preventDefault(); hideModal(loginModal); showModal(registerModal); });
  if (showLogin) showLogin.addEventListener('click', (e) => { e.preventDefault(); hideModal(registerModal); showModal(loginModal); });
  // Close modal on outside click
  [loginModal, registerModal].forEach(modal => {
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(modal); });
  });

  // Registration form submit
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      registerMessage.textContent = '';
      registerMessage.className = 'auth-message';
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value;
      const grade = document.getElementById('grade').value;
      const targetScore = document.getElementById('targetScore').value;
      const currentScore = document.getElementById('currentScore').value;
      if (!firstName || !lastName || !email || !password || !grade) {
        registerMessage.textContent = 'Please fill in all required fields.';
        registerMessage.classList.add('error');
        return;
      }
      registerMessage.textContent = 'Registering...';
      const result = await auth.register({ firstName, lastName, email, password, grade, targetScore, currentScore });
      if (result.success) {
        registerMessage.textContent = 'Registration successful!';
        registerMessage.classList.add('success');
        setTimeout(() => { hideModal(registerModal); updateAuthUI(); }, 1000);
        registerForm.reset();
      } else {
        registerMessage.textContent = result.error || 'Registration failed.';
        registerMessage.classList.add('error');
      }
    });
  }

  // Login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginMessage.textContent = '';
      loginMessage.className = 'auth-message';
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      if (!email || !password) {
        loginMessage.textContent = 'Please enter your email and password.';
        loginMessage.classList.add('error');
        return;
      }
      loginMessage.textContent = 'Logging in...';
      const result = await auth.login({ email, password });
      if (result.success) {
        loginMessage.textContent = 'Login successful!';
        loginMessage.classList.add('success');
        setTimeout(() => { hideModal(loginModal); updateAuthUI(); }, 1000);
        loginForm.reset();
      } else {
        loginMessage.textContent = result.error || 'Login failed.';
        loginMessage.classList.add('error');
      }
    });
  }

  // Logout button
  if (logoutBtn) logoutBtn.addEventListener('click', () => { auth.logout(); updateAuthUI(); });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export functions for global access
window.auth = auth;
window.courseAPI = courseAPI;
