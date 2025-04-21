
// DOM Elements
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const modal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close-modal');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginContent = document.getElementById('login-content');
const registerContent = document.getElementById('register-content');

// Session management
let isLoggedIn = false;

// Check if user is logged in from localStorage
function checkLoginStatus() {
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  updateNavigation();
}

// Update navigation based on login status
function updateNavigation() {
  const authLinks = document.querySelectorAll('.auth-link');
  const userLinks = document.querySelectorAll('.user-link');
  
  authLinks.forEach(link => {
    link.style.display = isLoggedIn ? 'none' : 'flex';
  });
  
  userLinks.forEach(link => {
    link.style.display = isLoggedIn ? 'flex' : 'none';
  });
  
  // Update hero buttons if they exist
  const heroButtons = document.getElementById('hero-buttons');
  if (heroButtons) {
    if (isLoggedIn) {
      heroButtons.innerHTML = `
        <a href="track.html" class="btn">Track Your Package</a>
        <a href="ship.html" class="btn btn-outline">Ship Now</a>
      `;
    } else {
      heroButtons.innerHTML = `
        <a href="register.html" class="btn">Get Started</a>
      `;
    }
  }
}

// Mobile menu toggle
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Modal functions
function openModal() {
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModalFunc() {
  if (modal) {
    modal.classList.remove('active');
  }
}

// Auth tab switching
function switchToLogin() {
  if (loginTab && registerTab && loginContent && registerContent) {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginContent.classList.add('active');
    registerContent.classList.remove('active');
  }
}

function switchToRegister() {
  if (loginTab && registerTab && loginContent && registerContent) {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerContent.classList.add('active');
    loginContent.classList.remove('active');
  }
}

// Login function
function login(event) {
  if (event) event.preventDefault();
  
  const email = document.getElementById('login-email')?.value;
  const password = document.getElementById('login-password')?.value;
  
  // Simple validation
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // Simulate login - in a real app, this would be an API call
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', email.split('@')[0]);
  
  isLoggedIn = true;
  updateNavigation();
  closeModalFunc();
  
  // Redirect to home page if not already there
  if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
    window.location.href = 'index.html';
  } else {
    // Just reload the page
    window.location.reload();
  }
}

// Register function
function register(event) {
  if (event) event.preventDefault();
  
  const firstName = document.getElementById('register-firstname')?.value;
  const lastName = document.getElementById('register-lastname')?.value;
  const email = document.getElementById('register-email')?.value;
  const password = document.getElementById('register-password')?.value;
  const confirmPassword = document.getElementById('register-confirm-password')?.value;
  
  // Simple validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  // Simulate registration - in a real app, this would be an API call
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', firstName + ' ' + lastName);
  
  isLoggedIn = true;
  updateNavigation();
  closeModalFunc();
  
  // Redirect to home page
  window.location.href = 'index.html';
}

// Logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn = false;
  updateNavigation();
  
  // Redirect to home page
  window.location.href = 'index.html';
}

// Tracking functionality
function trackPackage(event) {
  if (event) event.preventDefault();
  
  const trackingId = document.getElementById('tracking-id')?.value;
  const trackingResult = document.querySelector('.tracking-result');
  
  if (!trackingId) {
    alert('Please enter a tracking ID');
    return;
  }
  
  // Simulate tracking result - in a real app, this would be an API call
  if (trackingResult) {
    trackingResult.classList.add('active');
    
    // Scroll to result
    trackingResult.scrollIntoView({ behavior: 'smooth' });
  }
}

// Load user profile data
function loadUserProfile() {
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  if (userName) {
    const profileNameElements = document.querySelectorAll('.profile-name');
    profileNameElements.forEach(el => {
      el.textContent = userName;
    });
  }
  
  if (userEmail) {
    const profileEmailElements = document.querySelectorAll('.profile-email');
    profileEmailElements.forEach(el => {
      el.textContent = userEmail;
    });
    
    const emailInputs = document.querySelectorAll('.user-email-input');
    emailInputs.forEach(input => {
      input.value = userEmail;
    });
  }
  
  // Set first name and last name if available
  if (userName && userName.includes(' ')) {
    const [firstName, lastName] = userName.split(' ');
    const firstNameInputs = document.querySelectorAll('.user-firstname-input');
    const lastNameInputs = document.querySelectorAll('.user-lastname-input');
    
    firstNameInputs.forEach(input => {
      input.value = firstName;
    });
    
    lastNameInputs.forEach(input => {
      input.value = lastName;
    });
  }
}

// Profile tab switching
function switchProfileTab(tabId) {
  const allTabs = document.querySelectorAll('.profile-tab');
  const allContents = document.querySelectorAll('.profile-tab-content');
  
  allTabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  allContents.forEach(content => {
    content.classList.remove('active');
  });
  
  const selectedTab = document.getElementById(tabId);
  const selectedContent = document.getElementById(tabId + '-content');
  
  if (selectedTab) selectedTab.classList.add('active');
  if (selectedContent) selectedContent.classList.add('active');
}

// Payment methods functionality
function initPaymentMethods() {
  // Payment methods tabs
  const paymentTabs = document.querySelectorAll('.payment-tab');
  const paymentContents = document.querySelectorAll('.payment-tab-content');
  
  paymentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const paymentMethod = tab.getAttribute('data-payment');
      
      // Update active tab
      paymentTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      paymentContents.forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${paymentMethod}-payment`).classList.add('active');
    });
  });
  
  // Card selection
  const cardItems = document.querySelectorAll('.card-item');
  cardItems.forEach(card => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('add-card')) {
        cardItems.forEach(c => {
          if (!c.classList.contains('add-card')) {
            c.classList.remove('active');
          }
        });
        card.classList.add('active');
      }
    });
  });
  
  // UPI selection
  const upiItems = document.querySelectorAll('.upi-item');
  upiItems.forEach(item => {
    item.addEventListener('click', () => {
      upiItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
  
  // Bank selection
  const bankItems = document.querySelectorAll('.bank-item');
  bankItems.forEach(item => {
    item.addEventListener('click', () => {
      bankItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// Password visibility toggle
function initPasswordToggles() {
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        input.type = 'password';
        toggle.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  
  // Auth modal listeners
  if (loginBtn) loginBtn.addEventListener('click', openModal);
  if (registerBtn) registerBtn.addEventListener('click', openModal);
  if (closeModal) closeModal.addEventListener('click', closeModalFunc);
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
  
  // Tab switching
  if (loginTab) loginTab.addEventListener('click', switchToLogin);
  if (registerTab) registerTab.addEventListener('click', switchToRegister);
  
  // Form submissions
  if (loginForm) loginForm.addEventListener('submit', login);
  if (registerForm) registerForm.addEventListener('submit', register);
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
  
  // Track form submission
  const trackForm = document.getElementById('track-form');
  if (trackForm) {
    trackForm.addEventListener('submit', trackPackage);
  }
  
  // Load profile data if on profile page
  if (window.location.pathname.includes('userprofile.html')) {
    loadUserProfile();
    
    // Set default active tab
    switchProfileTab('personal-info');
    
    // Profile tab listeners
    const profileTabs = document.querySelectorAll('.profile-tab');
    profileTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        switchProfileTab(tabId);
      });
    });
    
    // Initialize payment methods
    initPaymentMethods();
  }
  
  // Initialize password toggles
  initPasswordToggles();
});
