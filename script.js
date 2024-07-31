// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });
  
