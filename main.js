// ============================================
// NAVIGATION MOBILE
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animation du bouton hamburger
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translateY(8px)' 
            : 'rotate(0) translateY(0)';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-8px)' 
            : 'rotate(0) translateY(0)';
    });
}

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(0)';
    });
});

// ============================================
// NAVIGATION STICKY & ACTIVE LINKS
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une ombre à la navbar lors du scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Mettre à jour le lien actif
    updateActiveLink();
    
    lastScroll = currentScroll;
});

// Mettre à jour le lien actif selon la section visible
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observer les éléments à révéler
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// ============================================
// PARTICLES ANIMATION (optionnel - pour le hero)
// ============================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    
    hero.appendChild(particlesContainer);
    
    // Créer des particules
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Ajouter l'animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10%, 90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);

// Initialiser les particules
createParticles();

// ============================================
// TYPING EFFECT (optionnel - pour le hero)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Appliquer l'effet de frappe au titre (optionnel)
// const highlightElement = document.querySelector('.highlight');
// if (highlightElement) {
//     const originalText = highlightElement.textContent;
//     typeWriter(highlightElement, originalText, 150);
// }

// ============================================
// FORM VALIDATION
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        // Validation simple
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Veuillez entrer une adresse email valide');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            display: block;
            margin-top: 0.25rem;
        `;
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.style.borderColor = '#ef4444';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '';
}

// Enlever l'erreur lors de la saisie
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        removeError(input);
    });
});

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Ajout d'un effet de confettis ou autre animation
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
    
    console.log('🎮 Konami Code activated! You found the easter egg! 🎉');
}

// ============================================
// PERFORMANCE - LAZY LOADING IMAGES
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(
    '%c🎮 Bienvenue sur le portfolio de kkhuete! 🎮',
    'color: #8b5cf6; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);

console.log(
    '%cDéveloppé avec ❤️ par Chocolait',
    'color: #ec4899; font-size: 14px;'
);

console.log(
    '%cTu veux voir le code source ? Retrouve-moi sur GitHub!',
    'color: #06b6d4; font-size: 12px;'
);
