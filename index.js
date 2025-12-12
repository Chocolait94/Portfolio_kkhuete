// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2000);
});

// ============================================
// PARTICLES ANIMATION
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(139, 92, 246, ${opacity}), transparent);
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            pointer-events: none;
            animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Ajouter l'animation des particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ============================================
// MOUSE FOLLOWER EFFECT
// ============================================
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFollower() {
    const diffX = mouseX - followerX;
    const diffY = mouseY - followerY;
    
    followerX += diffX * 0.1;
    followerY += diffY * 0.1;
    
    const container = document.querySelector('.welcome-container::before');
    if (container) {
        document.documentElement.style.setProperty('--mouse-x', followerX + 'px');
        document.documentElement.style.setProperty('--mouse-y', followerY + 'px');
    }
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-circle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ============================================
// START BUTTON ANIMATION
// ============================================
const startButton = document.querySelector('.start-button');

startButton.addEventListener('mouseenter', () => {
    createRipple(startButton);
});

function createRipple(button) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Ajouter l'animation du ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// TYPING EFFECT POUR LE TITRE
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(() => {
        type();
    }, 2500); // Commence après le chargement
}

const highlightName = document.querySelector('.highlight-name');
if (highlightName) {
    const nameText = highlightName.textContent;
    highlightName.style.opacity = '0';
    typeWriter(highlightName, nameText, 150);
}

// ============================================
// EASTER EGG - DOUBLE CLICK ON LOGO
// ============================================
const logoCenter = document.querySelector('.logo-center');
let clickCount = 0;

logoCenter.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 3) {
        activateEasterEgg();
        clickCount = 0;
    }
    
    setTimeout(() => {
        clickCount = 0;
    }, 1000);
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 3s linear';
    
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterEggStyle);
    
    setTimeout(() => {
        body.style.animation = '';
    }, 3000);
    
    console.log('🎮 Easter Egg activé! Triple click sur le logo! 🎉');
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============================================
// PERFORMANCE - PRELOAD MAIN PAGE
// ============================================
const mainPageLink = document.querySelector('a[href="main.html"]');
if (mainPageLink) {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'prefetch';
    preloadLink.href = 'main.html';
    document.head.appendChild(preloadLink);
}

// ============================================
// RESPONSIVE PARTICLES
// ============================================
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    createParticles();
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const startButton = document.querySelector('.start-button');
        if (document.activeElement === startButton) {
            e.preventDefault();
            startButton.click();
        }
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(
    '%c🎮 Bienvenue dans le portfolio de kkhuete! 🎮',
    'color: #8b5cf6; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);

console.log(
    '%c✨ Prêt à découvrir mon univers? ✨',
    'color: #ec4899; font-size: 16px; font-weight: bold;'
);

console.log(
    '%cAstuce: Triple-click sur le logo pour un easter egg! 😉',
    'color: #06b6d4; font-size: 12px;'
);
