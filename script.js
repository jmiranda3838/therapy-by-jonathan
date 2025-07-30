// Therapy by jonathan - Interactive JavaScript
// Liminal Modernism: Doorway interactions and smooth journey transitions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initServiceTagScrolling();
    initDoorwayAnimations();
    initScrollRevealAnimations();
    initNavigationInteractions();
    initAccessibilityFeatures();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Service tag scrolling functionality
function initServiceTagScrolling() {
    const serviceTags = document.querySelectorAll('.service-tags .doorway-tag');
    console.log('Found service tags:', serviceTags.length);
    
    // Map service tag text to their corresponding service cards
    const serviceMapping = {
        'Individual': '.doorway-frame.service-frame.individual',
        'Couples': '.doorway-frame.service-frame.couples', 
        'Family': '.doorway-frame.service-frame.family',
        'Group': '.doorway-frame.service-frame.group'
    };
    
    serviceTags.forEach((tag, index) => {
        console.log(`Setting up tag ${index}:`, tag.textContent);
        
        // Make tags focusable and add proper accessibility
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('role', 'button');
        tag.setAttribute('aria-label', `Scroll to ${tag.textContent} therapy section`);
        
        // Add click handler
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = this.textContent.trim();
            const targetSelector = serviceMapping[serviceType];
            
            console.log('Clicked service:', serviceType, 'Selector:', targetSelector);
            
            if (targetSelector) {
                const targetElement = document.querySelector(targetSelector);
                console.log('Target element found:', targetElement);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight || 80;
                    const rect = targetElement.getBoundingClientRect();
                    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetPosition = rect.top + currentScrollTop - headerHeight - 40;
                    
                    console.log('Element rect:', rect);
                    console.log('Current scroll:', currentScrollTop);
                    console.log('Header height:', headerHeight);
                    console.log('Final scroll position:', targetPosition);
                    
                    // Smooth scroll to the service card
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add temporary highlight effect to the target card
                    targetElement.style.transition = 'box-shadow 0.3s ease';
                    targetElement.style.boxShadow = '0 0 20px rgba(212, 132, 92, 0.4)';
                    
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 2000);
                } else {
                    console.error('Target element not found for selector:', targetSelector);
                }
            } else {
                console.error('No mapping found for service type:', serviceType);
            }
        });
        
        // Add keyboard support
        tag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Enhanced hover effect for clickable tags
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.cursor = 'pointer';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Doorway frame animations and interactions
function initDoorwayAnimations() {
    const doorwayFrames = document.querySelectorAll('.doorway-frame');
    
    doorwayFrames.forEach(frame => {
        // Add entrance animation when frame becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    // Animate entrance
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(frame);
    });
    
    // Enhanced hover effects for doorway buttons
    const doorwayButtons = document.querySelectorAll('.doorway-button');
    
    doorwayButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Scroll-triggered reveal animations for journey steps and services
function initScrollRevealAnimations() {
    // Journey steps animation - sequential reveal
    const journeySteps = document.querySelectorAll('.journey-step');
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
                
                stepObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    journeySteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px) scale(0.95)';
        step.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        stepObserver.observe(step);
    });
    
    // Service cards staggered animation
    const serviceCards = document.querySelectorAll('.service-card');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0) rotateY(0)';
                }, index * 150);
                
                serviceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateX(-50px) rotateY(-5deg)' : 'translateX(50px) rotateY(5deg)';
        card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        serviceObserver.observe(card);
    });
}

// Navigation interactions and scroll effects
function initNavigationInteractions() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    // Header background opacity on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const opacity = Math.min(scrollTop / 100, 0.95);
        
        header.style.background = `rgba(248, 246, 242, ${opacity})`;
        
        // Hide/show header on scroll direction (mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Accessibility enhancements
function initAccessibilityFeatures() {
    // Keyboard navigation for doorway elements
    const focusableElements = document.querySelectorAll('.doorway-frame, .doorway-button, .nav-link');
    
    focusableElements.forEach(element => {
        // Add tabindex if not already focusable
        if (!element.hasAttribute('tabindex') && !element.matches('a, button, input, select, textarea')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Enhanced focus states
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #E17B6A';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
        
        // Keyboard activation for non-button elements
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Announce page section changes for screen readers
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('h2, h3');
                if (sectionTitle) {
                    announceToScreenReader(`Entering ${sectionTitle.textContent}`);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-smooth', 'none');
        document.documentElement.style.setProperty('--transition-doorway', 'none');
        
        // Disable scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                }
            });
        });
        
        document.querySelectorAll('.journey-step, .service-card, .doorway-frame').forEach(el => {
            observer.observe(el);
        });
    }
}

// Utility function to announce content to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// CSS Animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        background: rgba(212, 132, 92, 0.15);
        color: #D4845C;
    }
    
    /* Smooth header transition */
    .header {
        transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
    }
    
    /* Enhanced focus states for better accessibility */
    .doorway-frame:focus-within {
        box-shadow: 0 0 0 3px #E17B6A;
    }
    
    /* Loading state for images */
    .placeholder-image {
        background-size: 200px 200px;
        background-image: 
            linear-gradient(135deg, var(--transition-space), var(--doorway-frame)),
            repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
            );
        animation: shimmer 2s infinite linear;
    }
    
    @keyframes shimmer {
        0% { background-position: 0 0; }
        100% { background-position: 200px 200px; }
    }
`;

document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);