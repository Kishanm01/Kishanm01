// ===================================
// Smooth Scroll Navigation
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Theme Toggle
// ===================================

const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        themeToggle.textContent = '🌙';
        document.documentElement.style.filter = 'none';
    } else {
        themeToggle.textContent = '☀️';
        document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// ===================================
// Parallax Effect
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// ===================================
// Mouse Tracking Effect on Cards
// ===================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ===================================
// Ripple Effect on Buttons
// ===================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn, .contact-btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn, .contact-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
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

// ===================================
// Active Navigation Link
// ===================================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ===================================
// Scroll to Top on Page Load
// ===================================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ===================================
// Dynamic Background Binary Animation
// ===================================

const binaryBg = document.querySelector('.binary-bg');
const binaryChars = ['0', '1'];

function generateBinaryCode() {
    let binary = '';
    for (let i = 0; i < 200; i++) {
        binary += binaryChars[Math.floor(Math.random() * 2)] + ' ';
    }
    return binary;
}

setInterval(() => {
    if (binaryBg) {
        binaryBg.style.opacity = '0.5';
        setTimeout(() => {
            binaryBg.style.opacity = '1';
        }, 2000);
    }
}, 8000);

// ===================================
// Lazy Loading for Images & Content
// ===================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Keyboard Navigation
// ===================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals or overlays if needed
        console.log('Escape key pressed');
    }
    
    // Tab key for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// Performance Optimization
// ===================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations happen here
    });
});

// ===================================
// Service Worker Registration (Optional PWA)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
}

// ===================================
// Console Easter Egg
// ===================================

console.log(
    '%c🚀 Welcome to Kishan\'s Portfolio!',
    'color: #00d4ff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cMade with ❤️ using clean code principles',
    'color: #00ff88; font-size: 14px;'
);
console.log(
    '%cFeel free to explore the code and reach out for collaborations!',
    'color: #b0b5d4; font-size: 12px;'
);