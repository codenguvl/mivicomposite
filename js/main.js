// ===== MAIN.JS - Common JavaScript Functions =====

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.querySelector(".header");
  const body = document.body;
  const isActive = mobileMenu.classList.contains("active");

  if (isActive) {
    mobileMenu.classList.remove("active");
    header.classList.remove("mobile-menu-open");
    body.classList.remove("mobile-menu-open");
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";
  } else {
    mobileMenu.classList.add("active");
    header.classList.add("mobile-menu-open");
    body.classList.add("mobile-menu-open");
    body.style.overflow = "hidden";
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.querySelector(".header");
  const body = document.body;

  mobileMenu.classList.remove("active");
  header.classList.remove("mobile-menu-open");
  body.classList.remove("mobile-menu-open");
  body.style.overflow = "";
  body.style.position = "";
  body.style.width = "";
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Close mobile menu when clicking outside
function initClickOutside() {
  document.addEventListener("click", function (event) {
    const mobileMenu = document.getElementById("mobileMenu");
    const menuButton = document.querySelector(".mobile-menu-btn");
    const header = document.querySelector(".header");
    const body = document.body;

    if (
      !mobileMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
      header.classList.remove("mobile-menu-open");
      body.classList.remove("mobile-menu-open");
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }
  });
}

// Add active state to navigation based on scroll position
function initScrollSpy() {
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav a, .mobile-menu a");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      // Only remove active class from anchor links, not from page links
      if (href && href.startsWith("#")) {
        link.classList.remove("active");
        if (href === "#" + current) {
          link.classList.add("active");
        }
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Touch events for mobile devices
function initTouchEvents() {
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const mobileMenu = document.getElementById("mobileMenu");
    const swipeThreshold = 50;

    if (mobileMenu.classList.contains("active")) {
      // Swipe right to close menu
      if (touchEndX - touchStartX > swipeThreshold) {
        closeMobileMenu();
      }
    }
  }
}

// Keyboard navigation
function initKeyboardNavigation() {
  document.addEventListener("keydown", function (e) {
    const mobileMenu = document.getElementById("mobileMenu");

    // Close mobile menu with Escape key
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize mobile menu functionality
  initSmoothScrolling();
  initClickOutside();
  initScrollSpy();
  initHeaderScroll();
  initTouchEvents();
  initKeyboardNavigation();

  console.log("Main.js loaded successfully!");
});

// Export functions for use in other files (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toggleMobileMenu,
    closeMobileMenu,
    initSmoothScrolling,
    initClickOutside,
    initScrollSpy,
    initHeaderScroll,
    initTouchEvents,
    initKeyboardNavigation,
  };
}
