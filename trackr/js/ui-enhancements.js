// UI Enhancements JavaScript
// Handles scroll progress, back to top, and intersection observer animations

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL PROGRESS BAR
    // ═══════════════════════════════════════════════════════════════
    const scrollProgress = document.getElementById('scrollProgress');
    
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate scroll percentage
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Update progress bar width
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial update
    updateScrollProgress();
    
    
    // ═══════════════════════════════════════════════════════════════
    // BACK TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.pointerEvents = 'auto';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.pointerEvents = 'none';
            }
        });
        
        // Initial state
        backToTopButton.style.opacity = '0';
        backToTopButton.style.pointerEvents = 'none';
        backToTopButton.style.transition = 'opacity 0.3s ease';
    }
    
    
    // ═══════════════════════════════════════════════════════════════
    // INTERSECTION OBSERVER FOR SECTION ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Add stagger animation to child elements
                const children = entry.target.querySelectorAll('.section-text, .subsection-title, .survey-stat-card, .finding-card, .persona-card, .affinity-card, .takeaway-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        sectionObserver.observe(section);
        
        // Set initial state for child elements
        const children = section.querySelectorAll('.section-text, .subsection-title, .survey-stat-card, .finding-card, .persona-card, .affinity-card, .takeaway-card');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
    
    
    // ═══════════════════════════════════════════════════════════════
    // PARALLAX EFFECT FOR ORBS (OPTIONAL - MOUSE MOVEMENT)
    // ═══════════════════════════════════════════════════════════════
    const orbs = document.querySelectorAll('.orb');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    
    // ═══════════════════════════════════════════════════════════════
    // SECTION NUMBERS REMOVED AS PER USER REQUEST
    // ═══════════════════════════════════════════════════════════════
    // Section number functionality has been removed
    
    
    // ═══════════════════════════════════════════════════════════════
    // SMOOTH REVEAL ANIMATION FOR CARDS
    // ═══════════════════════════════════════════════════════════════
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe workflow cards
    const workflowCards = document.querySelectorAll('.workflow-card');
    workflowCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        cardObserver.observe(card);
    });
    
    
    // ═══════════════════════════════════════════════════════════════
    // ENHANCED HOVER EFFECTS
    // ═══════════════════════════════════════════════════════════════
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.try-design-button, .fab');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    
    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE OPTIMIZATION
    // ═══════════════════════════════════════════════════════════════
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            updateScrollProgress();
        });
    }, { passive: true });
    
    
    // ═══════════════════════════════════════════════════════════════
    // CONSOLE MESSAGE
    // ═══════════════════════════════════════════════════════════════
    console.log('%c✨ Trackr UI Enhancements Loaded', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned & Developed by Manikanta Sai Teja Gundavarapu', 'color: #764ba2; font-size: 12px;');
});
