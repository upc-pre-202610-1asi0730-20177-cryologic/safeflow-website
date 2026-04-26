/**
 * SafeFlow Landing Page - JavaScript
 * Funcionalidades: Menu móvil, Modal, Animaciones, Interactividad
 */

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== Language Switcher =====
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        
        // Actualizar botones activos
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Cambiar idioma en i18n
        i18n.setLanguage(selectedLang);
        
        // Actualizar contenido de la página
        updatePageContent(selectedLang);
    });
});

// Función para actualizar el contenido de la página según el idioma
function updatePageContent(language) {
    const setText = (selector, key) => {
        const element = document.querySelector(selector);
        if (!element) return;
        const translated = i18n.t(key, language);
        if (translated !== key) {
            element.textContent = translated;
        }
    };

    // Actualizar texto de navegación
    setText('[href="#features"]', 'nav_features');
    setText('[href="#pricing"]', 'nav_pricing');
    setText('[href="#benefits"]', 'nav_benefits');
    setText('.nav-menu [href="#contact"]', 'nav_contact');
    
    // Actualizar hero section
    setText('.hero-title', 'hero_title');
    setText('.hero-subtitle', 'hero_subtitle');
    setText('.temp-label', 'temp_label');
    setText('#demoBtn', 'hero_demo');
    setText('.hero-buttons .btn-secondary', 'hero_contact');

    // Actualizar resultados
    setText('.results .section-title', 'results_title');
    setText('.results-subtitle', 'results_subtitle');
    document.querySelectorAll('.result-card').forEach((card, index) => {
        const resultNum = index + 1;
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        if (title) title.textContent = i18n.t(`result_${resultNum}_title`, language);
        if (description) description.textContent = i18n.t(`result_${resultNum}_desc`, language);
    });

    // Si el idioma no tiene traducciones completas, evita reemplazar el resto con claves.
    if (!i18n.translations[language]?.pricing_title) {
        return;
    }
    
    // Actualizar features
    document.querySelector('.features .section-title').textContent = i18n.t('features_title', language);
    const featuresEyebrow = document.querySelector('.features-eyebrow');
    if (featuresEyebrow) featuresEyebrow.textContent = i18n.t('features_eyebrow', language);
    const featuresLead = document.querySelector('.features-lead');
    if (featuresLead) featuresLead.textContent = i18n.t('features_lead', language);
    const featuresFootnote = document.querySelector('.features-footnote');
    if (featuresFootnote) {
        const main = i18n.t('features_footnote', language);
        const accent = i18n.t('features_footnote_highlight', language);
        featuresFootnote.innerHTML = `${main} <span>${accent}</span>`;
    }
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        const featureNum = index + 1;
        card.querySelector('h3').textContent = i18n.t(`feature_${featureNum}`, language);
        card.querySelector('p').textContent = i18n.t(`feature_${featureNum}_desc`, language);
    });
    
    // Actualizar how it works
    document.querySelector('.how-it-works .section-title').textContent = i18n.t('how_it_works_title', language);
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.querySelector('h3').textContent = i18n.t(`step_${stepNum}`, language);
        step.querySelector('p').textContent = i18n.t(`step_${stepNum}_desc`, language);
    });
    
    // Actualizar pricing
    document.querySelector('.pricing .section-title').textContent = i18n.t('pricing_title', language);
    document.querySelector('.pricing-intro p').textContent = i18n.t('pricing_intro', language);
    
    // Essential Plan
    const essentialCard = document.querySelector('.pricing-card:nth-of-type(1)');
    essentialCard.querySelector('.pricing-header h3').textContent = i18n.t('essential_title', language);
    essentialCard.querySelector('.pricing-subtitle').textContent = i18n.t('essential_subtitle', language);
    essentialCard.querySelector('.pricing-price').innerHTML = i18n.t('essential_price', language) + '<span>' + i18n.t('essential_period', language) + '</span>';
    essentialCard.querySelector('.pricing-description').textContent = i18n.t('essential_desc', language);
    const essentialFeatures = essentialCard.querySelectorAll('.pricing-features li');
    essentialFeatures[0].textContent = i18n.t('essential_feature_1', language);
    essentialFeatures[1].textContent = i18n.t('essential_feature_2', language);
    essentialFeatures[2].textContent = i18n.t('essential_feature_3', language);
    essentialFeatures[3].textContent = i18n.t('essential_feature_4', language);
    essentialFeatures[4].textContent = i18n.t('essential_feature_5', language);
    essentialCard.querySelector('.btn-outline').textContent = i18n.t('btn_start', language);
    
    // Professional Plan
    const professionalCard = document.querySelector('.pricing-card:nth-of-type(2)');
    professionalCard.querySelector('.badge').textContent = i18n.t('professional_popular', language);
    professionalCard.querySelector('.pricing-header h3').textContent = i18n.t('professional_title', language);
    professionalCard.querySelector('.pricing-subtitle').textContent = i18n.t('professional_subtitle', language);
    professionalCard.querySelector('.pricing-price').innerHTML = i18n.t('professional_price', language) + '<span>' + i18n.t('professional_period', language) + '</span>';
    professionalCard.querySelector('.pricing-description').textContent = i18n.t('professional_desc', language);
    const professionalFeatures = professionalCard.querySelectorAll('.pricing-features li');
    professionalFeatures[0].textContent = i18n.t('professional_feature_1', language);
    professionalFeatures[1].textContent = i18n.t('professional_feature_2', language);
    professionalFeatures[2].textContent = i18n.t('professional_feature_3', language);
    professionalFeatures[3].textContent = i18n.t('professional_feature_4', language);
    professionalFeatures[4].textContent = i18n.t('professional_feature_5', language);
    professionalCard.querySelector('.btn-primary').textContent = i18n.t('btn_get_started', language);
    
    // Enterprise Plan
    const enterpriseCard = document.querySelector('.pricing-card:nth-of-type(3)');
    enterpriseCard.querySelector('.pricing-header h3').textContent = i18n.t('enterprise_title', language);
    enterpriseCard.querySelector('.pricing-subtitle').textContent = i18n.t('enterprise_subtitle', language);
    enterpriseCard.querySelector('.pricing-price').textContent = i18n.t('enterprise_price', language);
    enterpriseCard.querySelector('.pricing-description').textContent = i18n.t('enterprise_desc', language);
    const enterpriseFeatures = enterpriseCard.querySelectorAll('.pricing-features li');
    enterpriseFeatures[0].textContent = i18n.t('enterprise_feature_1', language);
    enterpriseFeatures[1].textContent = i18n.t('enterprise_feature_2', language);
    enterpriseFeatures[2].textContent = i18n.t('enterprise_feature_3', language);
    enterpriseFeatures[3].textContent = i18n.t('enterprise_feature_4', language);
    enterpriseFeatures[4].textContent = i18n.t('enterprise_feature_5', language);
    enterpriseCard.querySelector('.btn-outline').textContent = i18n.t('btn_quote', language);
    
    // Services (si existe la sección)
    const servicesTitle = document.querySelector('.services-title');
    if (servicesTitle) {
        servicesTitle.textContent = i18n.t('services_title', language);
    }
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length >= 3) {
        // HaaS Service
        serviceCards[0].querySelector('h4').textContent = i18n.t('haas_service_title', language);
        serviceCards[0].querySelector('.service-price').textContent = i18n.t('haas_service_price', language);
        const haasFeatures = serviceCards[0].querySelectorAll('.service-features li');
        haasFeatures[0].textContent = i18n.t('haas_service_feature_1', language);
        haasFeatures[1].textContent = i18n.t('haas_service_feature_2', language);
        haasFeatures[2].textContent = i18n.t('haas_service_feature_3', language);
        haasFeatures[3].textContent = i18n.t('haas_service_feature_4', language);
        haasFeatures[4].textContent = i18n.t('haas_service_feature_5', language);
        
        // Compliance Service
        serviceCards[1].querySelector('h4').textContent = i18n.t('compliance_service_title', language);
        serviceCards[1].querySelector('.service-price').textContent = i18n.t('compliance_service_price', language);
        const complianceFeatures = serviceCards[1].querySelectorAll('.service-features li');
        complianceFeatures[0].textContent = i18n.t('compliance_service_feature_1', language);
        complianceFeatures[1].textContent = i18n.t('compliance_service_feature_2', language);
        complianceFeatures[2].textContent = i18n.t('compliance_service_feature_3', language);
        complianceFeatures[3].textContent = i18n.t('compliance_service_feature_4', language);
        complianceFeatures[4].textContent = i18n.t('compliance_service_feature_5', language);
        
        // Analytics Service
        serviceCards[2].querySelector('h4').textContent = i18n.t('analytics_service_title', language);
        serviceCards[2].querySelector('.service-price').textContent = i18n.t('analytics_service_price', language);
        const analyticsFeatures = serviceCards[2].querySelectorAll('.service-features li');
        analyticsFeatures[0].textContent = i18n.t('analytics_service_feature_1', language);
        analyticsFeatures[1].textContent = i18n.t('analytics_service_feature_2', language);
        analyticsFeatures[2].textContent = i18n.t('analytics_service_feature_3', language);
        analyticsFeatures[3].textContent = i18n.t('analytics_service_feature_4', language);
        analyticsFeatures[4].textContent = i18n.t('analytics_service_feature_5', language);
    }
    
    // Actualizar benefits
    document.querySelector('.benefits .section-title').textContent = i18n.t('benefits_title', language);
    document.querySelectorAll('.benefit-item').forEach((item, index) => {
        const benefitNum = index + 1;
        item.querySelector('h3').textContent = i18n.t(`benefit_${benefitNum}`, language);
        item.querySelector('p').textContent = i18n.t(`benefit_${benefitNum}_desc`, language);
    });
    
    // Actualizar industries
    document.querySelector('.industries .section-title').textContent = i18n.t('industries_title', language);
    document.querySelectorAll('.industry-card').forEach((card, index) => {
        const industryNum = index + 1;
        card.querySelector('h3').textContent = i18n.t(`industry_${industryNum}`, language);
        card.querySelector('p').textContent = i18n.t(`industry_${industryNum}_desc`, language);
    });
    
    // Actualizar team
    document.querySelector('.team .section-title').textContent = i18n.t('team_title', language);
    document.querySelector('.team-intro').textContent = i18n.t('team_intro', language);
    for (let i = 1; i <= 5; i++) {
        const card = document.querySelectorAll('.team-card')[i - 1];
        if (card) {
            const name = i18n.t(`team_member_${i}_name`, language);
            card.querySelector('.team-name').textContent = name;
            const role = card.querySelector('.team-role');
            if (role) role.textContent = i18n.t(`team_member_${i}_role`, language);
            const bio = card.querySelector('.team-bio');
            if (bio) bio.textContent = i18n.t(`team_member_${i}_bio`, language);
            const photo = card.querySelector('.team-card-photo img');
            if (photo) photo.setAttribute('alt', name);
        }
    }
    
    // Actualizar CTA
    document.querySelector('.cta-section h2').textContent = i18n.t('cta_title', language);
    document.querySelector('.cta-section p').textContent = i18n.t('cta_subtitle', language);
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons[0].textContent = i18n.t('cta_demo', language);
    ctaButtons[1].textContent = i18n.t('cta_sales', language);
    
    // Actualizar footer
    const footerSections = document.querySelectorAll('.footer-section');
    
    // Sección 1: SafeFlow
    footerSections[0].querySelector('h4').textContent = i18n.t('footer_title', language);
    footerSections[0].querySelector('p').textContent = i18n.t('footer_desc', language);
    
    // Sección 2: Producto
    footerSections[1].querySelector('h4').textContent = i18n.t('footer_product', language);
    const productLinks = footerSections[1].querySelectorAll('a');
    productLinks[0].textContent = i18n.t('footer_features', language);
    productLinks[1].textContent = i18n.t('footer_pricing', language);
    productLinks[2].textContent = i18n.t('footer_security', language);
    
    // Sección 3: Empresa
    footerSections[2].querySelector('h4').textContent = i18n.t('footer_company', language);
    const companyLinks = footerSections[2].querySelectorAll('a');
    companyLinks[0].textContent = i18n.t('footer_about', language);
    companyLinks[1].textContent = i18n.t('footer_blog', language);
    companyLinks[2].textContent = i18n.t('footer_careers', language);
    
    // Sección 4: Legal
    footerSections[3].querySelector('h4').textContent = i18n.t('footer_legal', language);
    const legalLinks = footerSections[3].querySelectorAll('a');
    legalLinks[0].textContent = i18n.t('footer_privacy', language);
    legalLinks[1].textContent = i18n.t('footer_terms', language);
    legalLinks[2].textContent = i18n.t('footer_contact', language);
    
    // Footer copyright
    document.querySelector('.footer-bottom p').textContent = i18n.t('footer_copyright', language);
}

// ===== Team carousel =====
function initTeamSlider() {
    const viewport = document.getElementById('teamSlider');
    const prev = document.getElementById('teamSliderPrev');
    const next = document.getElementById('teamSliderNext');
    if (!viewport || !prev || !next) return;

    const getStep = () => {
        const card = viewport.querySelector('.team-card');
        if (!card) return 320;
        const grid = viewport.querySelector('.team-grid');
        const gap = grid ? parseFloat(getComputedStyle(grid).gap) || 32 : 32;
        return card.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
        const { scrollLeft, scrollWidth, clientWidth } = viewport;
        const eps = 2;
        prev.disabled = scrollLeft <= eps;
        next.disabled = scrollLeft + clientWidth >= scrollWidth - eps;
    };

    prev.addEventListener('click', () => {
        viewport.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
        viewport.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    viewport.addEventListener('scroll', () => {
        requestAnimationFrame(updateButtons);
    }, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
}

// Inicializar idioma al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const currentLang = i18n.getLanguage();
    document.querySelector(`[data-lang="${currentLang}"]`).classList.add('active');
    updatePageContent(currentLang);
    initTeamSlider();
});

// ===== Modal Demo =====
const demoBtn = document.getElementById('demoBtn');
const demoModal = document.getElementById('demoModal');
const modalClose = document.querySelector('.modal-close');

if (demoBtn && demoModal && modalClose && demoBtn.dataset.openModal === 'true') {
    demoBtn.addEventListener('click', () => {
        demoModal.classList.add('active');
        demoModal.setAttribute('aria-hidden', 'false');
    });

    modalClose.addEventListener('click', () => {
        demoModal.classList.remove('active');
        demoModal.setAttribute('aria-hidden', 'true');
    });

    // Cerrar modal al hacer clic fuera
    demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) {
            demoModal.classList.remove('active');
            demoModal.setAttribute('aria-hidden', 'true');
        }
    });
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (demoModal && e.key === 'Escape' && demoModal.classList.contains('active')) {
        demoModal.classList.remove('active');
        demoModal.setAttribute('aria-hidden', 'true');
    }
});

// ===== Smooth Scroll Behavior =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// ===== Intersection Observer para animaciones =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.feature-card, .benefit-item, .industry-card, .pricing-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// ===== Contacto =====
const contactButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
contactButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent;
        if (text.includes('Demo') || text.includes('Contacto') || text.includes('Ventas') || text.includes('Comenzar')) {
            console.log('Acción: ' + text);
            // Aquí puedes agregar redirección a formulario
        }
    });
});

// ===== Analytics Event =====
function trackEvent(eventName, eventData = {}) {
    console.log('Event:', eventName, eventData);
    // Integración con Google Analytics o similar
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', { 
            button_text: btn.textContent 
        });
    });
});

// ===== Tema alternancia (Bonus) =====
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Inicializar tema
initThemeToggle();

// ===== Validación Simple de Formulario (Bonus) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Scroll to Top Button (Bonus) =====
function createScrollTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.textContent = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: none;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        z-index: 999;
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.alignItems = 'center';
            scrollBtn.style.justifyContent = 'center';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Crear botón de scroll top
createScrollTopButton();

// ===== Inicialización =====
console.log('SafeFlow Landing Page initialized successfully');
console.log('Version: 1.0.0');
console.log('Author: SafeFlow Team');
