// ============================================
// 3D TILT EFFECT ON SOCIAL CARDS
// ============================================
const socialCards = document.querySelectorAll('.social-card');

socialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            translateY(-15px) 
            scale(1.05) 
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Créer des particules au hover
    card.addEventListener('mouseenter', () => {
        createCardParticles(card);
    });
});

function createCardParticles(card) {
    const colors = {
        instagram: ['#f09433', '#e6683c', '#dc2743', '#cc2366'],
        tiktok: ['#00f2ea', '#ff0050', '#00f2ea'],
        youtube: ['#ff0000', '#ff4444', '#cc0000'],
        twitch: ['#9146ff', '#772ce8', '#b19cd9']
    };
    
    const cardClass = card.classList[1]; // instagram, tiktok, etc.
    const particleColors = colors[cardClass] || ['#8b5cf6'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        
        const size = Math.random() * 6 + 3;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 50 + Math.random() * 30;
        const duration = 0.6 + Math.random() * 0.4;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            pointer-events: none;
            z-index: 5;
            animation: particle-burst ${duration}s ease-out forwards;
            --angle: ${angle}rad;
            --distance: ${distance}px;
            box-shadow: 0 0 10px ${color};
        `;
        
        card.appendChild(particle);
        
        setTimeout(() => particle.remove(), duration * 1000);
    }
}

// Ajouter l'animation des particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-burst {
        0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) 
                       translate(
                           calc(cos(var(--angle)) * var(--distance)),
                           calc(sin(var(--angle)) * var(--distance))
                       ) 
                       scale(0);
            opacity: 0;
        }
    }
    
    .hover-particle {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(particleStyle);

// ============================================
// EASTER EGG - TRIPLE CLICK ON LOGO
// ============================================
const brandLogo = document.querySelector('.brand-logo');
const easterEggModal = document.getElementById('easterEggModal');
const easterEggClose = document.querySelector('.easter-egg-close');
const easterEggOverlay = document.querySelector('.easter-egg-overlay');

let logoClickCount = 0;
let logoClickTimer = null;

if (brandLogo && easterEggModal) {
    console.log('✅ Easter egg initialisé ! Clique 5 fois sur le logo KK');
    
    brandLogo.addEventListener('click', (e) => {
        e.preventDefault();
        logoClickCount++;
        
        console.log(`🎯 Clic ${logoClickCount}/5 sur le logo`);
        
        // Effet visuel sur le logo
        brandLogo.style.animation = 'none';
        setTimeout(() => {
            brandLogo.style.animation = 'pulse 2s infinite';
        }, 10);
        
        if (logoClickCount === 5) {
            // Easter egg activé !
            console.log('🎉🎊 EASTER EGG TROUVÉ ! 🎊🎉');
            easterEggModal.classList.add('active');
            logoClickCount = 0;
            
            // Confettis
            createConfetti();
        }
        
        // Reset après 1.5 secondes
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => {
            if (logoClickCount > 0) {
                console.log('⏱️ Timer reset - Recommence à cliquer !');
            }
            logoClickCount = 0;
        }, 1500);
    });
} else {
    console.error('❌ Easter egg non trouvé:', {
        brandLogo: !!brandLogo,
        easterEggModal: !!easterEggModal
    });
}
{
    // Fermer le modal
    easterEggClose.addEventListener('click', () => {
        easterEggModal.classList.remove('active');
    });
    
    easterEggOverlay.addEventListener('click', () => {
        easterEggModal.classList.remove('active');
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && easterEggModal.classList.contains('active')) {
            easterEggModal.classList.remove('active');
        }
    });
}

// Fonction pour créer des confettis
function createConfetti() {
    const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: 1;
            z-index: 10001;
            pointer-events: none;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Animation des confettis
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

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
// COPY EMAIL TO CLIPBOARD
// ============================================
const copyEmailBtn = document.querySelector('.copy-email-btn');
const copyFeedback = document.querySelector('.copy-feedback');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const email = copyEmailBtn.getAttribute('data-email');
        
        // Copier dans le presse-papier
        navigator.clipboard.writeText(email).then(() => {
            // Afficher le message de confirmation
            copyFeedback.classList.add('show');
            
            // Changer l'icône temporairement
            const icon = copyEmailBtn.querySelector('i');
            icon.className = 'fas fa-check';
            copyEmailBtn.style.borderColor = 'var(--accent-color)';
            copyEmailBtn.style.color = 'var(--accent-color)';
            
            // Réinitialiser après 2 secondes
            setTimeout(() => {
                copyFeedback.classList.remove('show');
                icon.className = 'fas fa-copy';
                copyEmailBtn.style.borderColor = '';
                copyEmailBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
            copyFeedback.textContent = 'Erreur lors de la copie';
            copyFeedback.style.color = '#ef4444';
            copyFeedback.classList.add('show');
            
            setTimeout(() => {
                copyFeedback.classList.remove('show');
                copyFeedback.textContent = 'Adresse copiée !';
                copyFeedback.style.color = '';
            }, 2000);
        });
    });
}

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
// SECRET IMAGE EASTER EGG
// ============================================
const secretImage = document.getElementById('secretImage');
const secretClose = document.querySelector('.secret-close');
const aboutSection = document.getElementById('about');
let aboutClicks = 0;
let clickTimeout;

// Trigger: 3 clics rapides sur la section About
aboutSection.addEventListener('click', () => {
    aboutClicks++;
    console.log(`🔍 Clics sur About: ${aboutClicks}/3`);
    
    clearTimeout(clickTimeout);
    
    if (aboutClicks === 3) {
        console.log('🎉 Secret image débloquée!');
        secretImage.classList.add('show');
        document.body.style.overflow = 'hidden';
        aboutClicks = 0;
    }
    
    clickTimeout = setTimeout(() => {
        aboutClicks = 0;
    }, 1000);
});

// Fermer avec le bouton
secretClose.addEventListener('click', () => {
    console.log('❌ Secret image fermée');
    secretImage.classList.remove('show');
    document.body.style.overflow = '';
});

// Fermer en cliquant sur l'overlay
document.querySelector('.secret-overlay').addEventListener('click', () => {
    secretImage.classList.remove('show');
    document.body.style.overflow = '';
});

// Fermer avec Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && secretImage.classList.contains('show')) {
        secretImage.classList.remove('show');
        document.body.style.overflow = '';
    }
});

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

console.log(
    '%c🔍 Easter Egg 1: Clique 5 fois sur le logo KK',
    'color: #8b5cf6; font-size: 11px; font-style: italic;'
);

console.log(
    '%c🔍 Easter Egg 2: Clique 3 fois sur la section About',
    'color: #ec4899; font-size: 11px; font-style: italic;'
);
