// Carousel Gallery JavaScript
class EventCarousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.dots = this.carousel.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000;
        
        this.init();
    }
    
    init() {
        this.startAutoPlay();
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        // Resume autoplay when mouse leaves
        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
        
        // Touch events for mobile
        let startX = null;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.pauseAutoPlay();
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!startX) return;
            
            let endX = e.changedTouches[0].clientX;
            let diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            startX = null;
            this.startAutoPlay();
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (this.dots[i]) {
                this.dots[i].classList.remove('active');
            }
        });
        
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            if (this.dots[index]) {
                this.dots[index].classList.add('active');
            }
        }
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        this.pauseAutoPlay(); // Clear existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.startAutoPlay();
    }
}

// Global carousel instances
let carousels = {};

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel 1
    if (document.getElementById('carousel1')) {
        carousels.carousel1 = new EventCarousel('carousel1');
    }
    
    // Initialize carousel 2
    if (document.getElementById('carousel2')) {
        carousels.carousel2 = new EventCarousel('carousel2');
    }
});

// Global functions for button controls (referenced in HTML)
function nextSlide(carouselId) {
    if (carousels[carouselId]) {
        carousels[carouselId].nextSlide();
        carousels[carouselId].resetAutoPlay();
    }
}

function prevSlide(carouselId) {
    if (carousels[carouselId]) {
        carousels[carouselId].prevSlide();
        carousels[carouselId].resetAutoPlay();
    }
}

function currentSlide(carouselId, slideIndex) {
    if (carousels[carouselId]) {
        carousels[carouselId].goToSlide(slideIndex - 1); // Convert to 0-based index
    }
}

// Intersection Observer for performance optimization
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const carouselId = entry.target.id;
            if (entry.isIntersecting) {
                // Start autoplay when carousel comes into view
                if (carousels[carouselId] && !carousels[carouselId].autoPlayInterval) {
                    carousels[carouselId].startAutoPlay();
                }
            } else {
                // Pause autoplay when carousel goes out of view
                if (carousels[carouselId]) {
                    carousels[carouselId].pauseAutoPlay();
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe carousels when they're created
    document.addEventListener('DOMContentLoaded', function() {
        const carouselElements = document.querySelectorAll('.carousel-container');
        carouselElements.forEach(carousel => {
            observer.observe(carousel);
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!document.querySelector('.carousel-container:hover')) return;
    
    const hoveredCarousel = document.querySelector('.carousel-container:hover');
    const carouselId = hoveredCarousel.id;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide(carouselId);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide(carouselId);
    }
});

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
        const imagePreloader = new Image();
        imagePreloader.src = img.src;
    });
});