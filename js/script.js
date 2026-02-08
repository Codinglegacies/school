// ============================================
// THE SKILLED MUSICIAN - MAIN JAVASCRIPT
// ============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Create mailto link with form data
        const mailtoLink = `mailto:info@theskilledmusician.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;
        
        // Show success message and reset form
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
        
        // In a real application, you would send this via AJAX to a backend
        // For now, we'll just show the confirmation
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert function
function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add styles to alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-alerts]')) {
        style.setAttribute('data-alerts', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alert);
    
    // Remove alert after 5 seconds
    setTimeout(function() {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            alert.remove();
        }, 300);
    }, 5000);
}

// Video Modal/Lightbox functionality
function setupVideoModals() {
    const videoCards = document.querySelectorAll('.video-placeholder');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoTitle = this.nextElementSibling?.textContent || 'Video Lesson';
            showVideoModal(videoTitle);
        });
    });
}

function showVideoModal(title) {
    // This would normally open a modal with a video player
    showAlert(`Video: "${title}" - Video player would open here. Add your video source when ready!`, 'success');
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active state to navigation links
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        
        if (item.getAttribute('href') === currentLocation || 
            item.getAttribute('href') === './' + currentLocation.split('/').pop() ||
            currentLocation.includes(item.getAttribute('href').replace('pages/', ''))) {
            item.classList.add('active');
        }
    });
}

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Intersection Observer for fade-in animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.course-card, .welcome-card, .instructor-card, .value-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    if (!document.querySelector('style[data-animations]')) {
        style.setAttribute('data-animations', 'true');
        document.head.appendChild(style);
    }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Setup video modals on page load
document.addEventListener('DOMContentLoaded', setupVideoModals);

// Utility function to track user interactions
function trackEvent(category, action, label) {
    // This can be used with Google Analytics or other tracking services
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent;
            trackEvent('button', 'click', text);
        });
    });
});

// Add form field validation styles
function setupFormValidation() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#bdc3c7';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '#bdc3c7';
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormValidation);

// Responsive table scrolling for services page
function setupResponsiveTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (table.offsetWidth > window.innerWidth) {
            table.style.overflowX = 'auto';
        }
    });
}

document.addEventListener('DOMContentLoaded', setupResponsiveTables);

// Social media link tracking
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-card, .social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent || this.href;
            trackEvent('social_media', 'click', platform);
        });
    });
});

// Add scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTopBtn';
    button.textContent = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #8B4513;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('hover', function() {
        this.style.backgroundColor = '#D2691E';
        this.style.transform = 'scale(1.1)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Performance: Lazy load images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Export functions for use in HTML if needed
window.trackEvent = trackEvent;
window.showAlert = showAlert;
