// Theme Management
class ThemeManager {
    constructor() {
        // Force light theme permanently
        this.theme = 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        // Always apply light theme
        this.theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }

    toggleTheme() {
        // Theme toggling disabled; keep light theme
        this.theme = 'light';
        this.applyTheme();
    }

    bindEvents() {
        // Theme toggle removed; no event bindings needed. Always stay on light theme.
    }
}

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.mobileNav = document.getElementById('mobileNav');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.menuBtn && this.mobileNav) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.menuBtn.addEventListener('click', () => this.toggle());
        
        // Close menu when clicking on links
        const navLinks = this.mobileNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menuBtn.contains(e.target) && !this.mobileNav.contains(e.target)) {
                this.close();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.menuBtn.classList.add('active');
        this.mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.menuBtn.classList.remove('active');
        this.mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Smooth Scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.property-card, .advantage-item, .project-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Form Validation Utilities
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    static showError(element, message) {
        const errorElement = element.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }

        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'var(--error-color)';
        error.style.fontSize = 'var(--font-size-sm)';
        error.style.marginTop = 'var(--spacing-1)';
        error.textContent = message;
        
        element.parentNode.appendChild(error);
        element.style.borderColor = 'var(--error-color)';
    }

    static clearError(element) {
        const errorElement = element.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        element.style.borderColor = '';
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            { href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() {
                    this.onload = null;
                    this.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }
}

// Accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addSkipLinks();
        this.improveScreenReaderExperience();
    }

    enhanceKeyboardNavigation() {
        // Add visible focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Trap focus in mobile menu when open
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            mobileNav.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && mobileNav.classList.contains('active')) {
                    const focusableElements = mobileNav.querySelectorAll('a, button');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Aller au contenu principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main landmark if not present
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    improveScreenReaderExperience() {
        // Add live region for dynamic content updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Announce page changes
        window.addEventListener('popstate', () => {
            const pageTitle = document.title;
            liveRegion.textContent = `Page changée: ${pageTitle}`;
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new ThemeManager();
    new MobileMenu();
    new SmoothScroll();
    
    // Progressive enhancements
    if ('IntersectionObserver' in window) {
        new AnimationObserver();
    }
    
    new PerformanceOptimizer();
    new AccessibilityEnhancer();
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.type === 'submit' || this.classList.contains('loading-btn')) {
                this.classList.add('loading');
                
                // Remove loading state after 3 seconds (fallback)
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 3000);
            }
        });
    });
});

// Export for use in other modules
window.FormValidator = FormValidator;