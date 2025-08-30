// ===== HOME.JS - Page Specific JavaScript =====

// This file is now clean and only contains page-specific functionality
// All common functions (mobile menu, smooth scrolling, etc.) are now in main.js

console.log("Home.js loaded - page specific functionality ready!");

// Gallery Card Functionality
function initGalleryCards() {
  const galleryCards = document.querySelectorAll(".gallery-card");

  if (galleryCards.length === 0) return;

  galleryCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove active class from all cards
      galleryCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      this.classList.add("active");
    });
  });
}

// Initialize gallery functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initGalleryCards();
});
