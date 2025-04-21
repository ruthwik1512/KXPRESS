document.addEventListener('DOMContentLoaded', function() {
  // Page loader
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        pageLoader.classList.add('loaded');
      }, 500);
    });
  }
  
  // Fade-in animations on scroll
  const fadeElements = document.querySelectorAll('.section, .feature-card, .service-card, .stat-item, .cta, .form-container, .tracking-form, .support-container, .profile-content');
  
  // Add fade-in class to elements
  fadeElements.forEach(function(element, index) {
    element.classList.add('fade-in');
    // Add delay classes based on element type
    if (element.classList.contains('feature-card') || element.classList.contains('service-card') || element.classList.contains('stat-item')) {
      const delay = index % 4;
      element.classList.add(`delay-${delay + 1}`);
    }
  });
  
  // Check if elements are in viewport
  function checkFade() {
    fadeElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('appear');
      }
    });
  }
  
  // Initial check
  checkFade();
  
  // Check on scroll
  window.addEventListener('scroll', checkFade);
  
  // Scroll-to-top button
  const scrollTopButton = document.getElementById('scrollTop');
  if (scrollTopButton) {
    function toggleScrollButton() {
      if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('visible');
      } else {
        scrollTopButton.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', toggleScrollButton);
    
    scrollTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animated counting for stats (only on pages with stats)
  const statElements = document.querySelectorAll('.stat-number');
  if (statElements.length > 0) {
    const statsSection = document.querySelector('.stats');
    let statsAnimated = false;
    
    function animateStats() {
      statElements.forEach(function(stat) {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        let displayed = 0;
        
        // Handle special cases like "24/7"
        if (stat.textContent.includes('/')) {
          return;
        }
        
        const step = Math.max(1, Math.floor(target / 100));
        const duration = 2000; // 2 seconds
        const interval = Math.floor(duration / (target / step));
        
        const counter = setInterval(function() {
          displayed += step;
          
          if (displayed >= target) {
            displayed = target;
            clearInterval(counter);
          }
          
          // Format with + for large numbers
          let formattedNumber = displayed;
          if (target > 1000) {
            formattedNumber = displayed >= 1000000 ? (displayed / 1000000).toFixed(1) + 'M' : 
                             displayed >= 1000 ? (displayed / 1000).toFixed(0) + 'K' : displayed;
          }
          
          stat.textContent = formattedNumber + (target > 100 ? '+' : '');
        }, interval);
      });
    }
    
    function checkStatsInView() {
      if (statsAnimated || !statsSection) return;
      
      const statsSectionTop = statsSection.getBoundingClientRect().top;
      
      if (statsSectionTop < window.innerHeight - 100) {
        animateStats();
        statsAnimated = true;
      }
    }
    
    window.addEventListener('scroll', checkStatsInView);
    
    // Initial check for stats
    checkStatsInView();
  }
}); 