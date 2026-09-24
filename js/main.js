// js/main.js
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ---- SCROLL FADE ANIMATIONS ----
// Using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with fade classes
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale, .stagger-children');
  
  // Create an observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Element is entering viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Unobserve after animation to save resources
        // observer.unobserve(entry.target);
      } else {
        // Element is leaving viewport - remove class to fade out
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger point
  });

  // Observe each element
  fadeElements.forEach(el => observer.observe(el));

  // Optional: Also observe images that need to load
  const images = document.querySelectorAll('.fade-in img');
  images.forEach(img => {
    if (img.complete) {
      // Image already loaded
    } else {
      img.addEventListener('load', () => {
        img.closest('.fade-in')?.classList.add('visible');
      });
    }
  });
});