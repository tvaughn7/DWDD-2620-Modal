// Hamburger menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  // Toggle navigation menu on hamburger click
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
});
