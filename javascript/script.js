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

// Logo: ir al inicio de la página de forma suave sin cambiar la URL
const logoLink = document.getElementById('logoLink');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

function applyDocumentMeta(language) {
    const lang = language || i18n.getLanguage();
    const title = i18n.t('meta_title', lang);
    const desc = i18n.t('meta_description', lang);
    const keywords = i18n.t('meta_keywords', lang);
    document.title = title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', desc);
    const mk = document.querySelector('meta[name="keywords"]');
    if (mk) mk.setAttribute('content', keywords);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'es_PE');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
}

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
    setText('.nav-menu [href="#product-demo"]', 'nav_product');
    setText('.nav-menu [href="#features"]', 'nav_features');
    setText('.nav-menu [href="#how-it-works"]', 'nav_how');
    setText('.nav-menu [href="#pricing"]', 'nav_pricing');
    setText('.nav-menu [href="#team"]', 'nav_team');
    setText('.nav-menu [href="#industries"]', 'nav_industries');
    setText('.nav-menu [href="#contact"]', 'nav_contact');
    setText('#skipLink', 'skip_to_main');
    // Actualizar hero section
    setText('.hero-title__before', 'hero_title_before');
    setText('.hero-title__accent', 'hero_title_accent');
    setText('.hero-title__after', 'hero_title_after');
    setText('.hero-subtitle', 'hero_subtitle');
    setText('.temp-label', 'temp_label');
    setText('#demoBtn', 'hero_demo');

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

    // Plataforma / propuesta de valor
    const pdTitle = document.querySelector('.product-demo__title');
    if (pdTitle) pdTitle.textContent = i18n.t('product_demo_title', language);
    setText('.product-demo__lead', 'product_demo_lead');
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length >= 3) {
        valueCards[0].querySelector('.value-card__label').textContent = i18n.t('value_problem_label', language);
        valueCards[0].querySelector('.value-card__text').textContent = i18n.t('value_problem_text', language);
        valueCards[1].querySelector('.value-card__label').textContent = i18n.t('value_audience_label', language);
        valueCards[1].querySelector('.value-card__text').textContent = i18n.t('value_audience_text', language);
        valueCards[2].querySelector('.value-card__label').textContent = i18n.t('value_benefit_label', language);
        valueCards[2].querySelector('.value-card__text').textContent = i18n.t('value_benefit_text', language);
    }
    setText('.product-demo__caption', 'product_demo_caption');
    setText('.product-demo__figure:not(.team-video) .video-embed__title', 'video_product_title');
    setText('.team-video .video-embed__title', 'video_team_title');
    const pdBtns = document.querySelectorAll('.product-demo__cta-row .btn');
    if (pdBtns[0]) pdBtns[0].textContent = i18n.t('product_demo_btn_demo', language);
    if (pdBtns[1]) pdBtns[1].textContent = i18n.t('product_demo_btn_meeting', language);

    // Tecnología
    const techSection = document.querySelector('.technology .section-title');
    if (techSection) techSection.textContent = i18n.t('technology_title', language);
    setText('.technology__intro', 'technology_intro');
    const techCards = document.querySelectorAll('.technology-card');
    if (techCards.length >= 3) {
        techCards[0].querySelector('h3').textContent = i18n.t('technology_card1_title', language);
        techCards[0].querySelector('p').textContent = i18n.t('technology_card1_text', language);
        techCards[1].querySelector('h3').textContent = i18n.t('technology_card2_title', language);
        techCards[1].querySelector('p').textContent = i18n.t('technology_card2_text', language);
        techCards[2].querySelector('h3').textContent = i18n.t('technology_card3_title', language);
        techCards[2].querySelector('p').textContent = i18n.t('technology_card3_text', language);
    }

    // FAQ
    const faqTitle = document.querySelector('.faq .section-title');
    if (faqTitle) faqTitle.textContent = i18n.t('faq_title', language);
    setText('.faq__subtitle', 'faq_subtitle');
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const n = index + 1;
        const sum = item.querySelector('summary');
        const ans = item.querySelector('.faq-answer');
        if (sum) sum.textContent = i18n.t(`faq_q_${n}`, language);
        if (ans) ans.textContent = i18n.t(`faq_a_${n}`, language);
    });

    // Ventajas (eyebrow + lead)
    const benefitsEyebrow = document.querySelector('.benefits-eyebrow');
    if (benefitsEyebrow) benefitsEyebrow.textContent = i18n.t('benefits_eyebrow', language);
    const benefitsLead = document.querySelector('.benefits-lead');
    if (benefitsLead) benefitsLead.textContent = i18n.t('benefits_lead', language);
    
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
    essentialFeatures.forEach((li, idx) => {
        const key = `essential_feature_${idx + 1}`;
        const t = i18n.t(key, language);
        if (t !== key) li.textContent = t;
    });
    const essentialCta = essentialCard.querySelector('.btn-outline');
    if (essentialCta) essentialCta.textContent = i18n.t('btn_start', language);
    
    // Professional Plan
    const professionalCard = document.querySelector('.pricing-card:nth-of-type(2)');
    professionalCard.querySelector('.badge').textContent = i18n.t('professional_popular', language);
    professionalCard.querySelector('.pricing-header h3').textContent = i18n.t('professional_title', language);
    professionalCard.querySelector('.pricing-subtitle').textContent = i18n.t('professional_subtitle', language);
    professionalCard.querySelector('.pricing-price').innerHTML = i18n.t('professional_price', language) + '<span>' + i18n.t('professional_period', language) + '</span>';
    professionalCard.querySelector('.pricing-description').textContent = i18n.t('professional_desc', language);
    const professionalFeatures = professionalCard.querySelectorAll('.pricing-features li');
    professionalFeatures.forEach((li, idx) => {
        const key = `professional_feature_${idx + 1}`;
        const t = i18n.t(key, language);
        if (t !== key) li.textContent = t;
    });
    const professionalCta = professionalCard.querySelector('.btn-primary');
    if (professionalCta) professionalCta.textContent = i18n.t('btn_get_started', language);
    
    // Enterprise Plan
    const enterpriseCard = document.querySelector('.pricing-card:nth-of-type(3)');
    enterpriseCard.querySelector('.pricing-header h3').textContent = i18n.t('enterprise_title', language);
    enterpriseCard.querySelector('.pricing-subtitle').textContent = i18n.t('enterprise_subtitle', language);
    enterpriseCard.querySelector('.pricing-price').textContent = i18n.t('enterprise_price', language);
    enterpriseCard.querySelector('.pricing-description').textContent = i18n.t('enterprise_desc', language);
    const enterpriseFeatures = enterpriseCard.querySelectorAll('.pricing-features li');
    enterpriseFeatures.forEach((li, idx) => {
        const key = `enterprise_feature_${idx + 1}`;
        const t = i18n.t(key, language);
        if (t !== key) li.textContent = t;
    });
    const enterpriseCta = enterpriseCard.querySelector('.btn-outline');
    if (enterpriseCta) enterpriseCta.textContent = i18n.t('btn_quote', language);
    
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
    const benefitsHeading = document.querySelector('.benefits-heading');
    if (benefitsHeading) benefitsHeading.textContent = i18n.t('benefits_title', language);
    else document.querySelector('.benefits .section-title').textContent = i18n.t('benefits_title', language);
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
        const paragraphs = card.querySelectorAll('p');
        if (paragraphs[0]) {
            paragraphs[0].textContent = i18n.t(`industry_${industryNum}_desc`, language);
        }
        const detail = card.querySelector('.industry-card__detail');
        if (detail) {
            detail.textContent = i18n.t(`industry_${industryNum}_detail`, language);
        }
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
    
    // Contacto (dos columnas) + CTA
    const contactHeroTitle = document.querySelector('.contact-section .contact-hero .section-title');
    if (contactHeroTitle) contactHeroTitle.textContent = i18n.t('cta_title', language);
    setText('.contact-hero__subtitle', 'cta_subtitle');
    setText('.contact-split__eyebrow--form', 'contact_form_heading');
    setText('.contact-split__intro', 'contact_form_intro');
    setText('.contact-form__label--first', 'contact_form_first_name');
    setText('.contact-form__label--last', 'contact_form_last_name');
    setText('.contact-form__label--email', 'contact_form_email');
    setText('.contact-form__label--country', 'contact_form_country');
    setText('.contact-form__label--region', 'contact_form_region');
    const submitBtn = document.querySelector('.contact-form__submit');
    if (submitBtn) submitBtn.textContent = i18n.t('contact_form_submit', language);
    setText('.contact-split__eyebrow--info', 'contact_info_heading');
    setText('.contact-info-row__dt--phone', 'contact_info_phone_caption');
    setText('.contact-info-row__dt--address', 'contact_info_address_caption');
    setText('.contact-info-row__dt--email', 'contact_info_email_caption');
    setText('.contact-address-text', 'contact_address_full');
    setText('.contact-form__label--message', 'contact_form_message');
    const msgTa = document.querySelector('.contact-form__textarea');
    if (msgTa) msgTa.placeholder = i18n.t('contact_form_message_ph', language);
    
    // Actualizar footer
    const footerSections = document.querySelectorAll('.footer-section');
    
    // Sección 1: SafeFlow
    const footerBrandName = footerSections[0].querySelector('.footer-brand__name');
    if (footerBrandName) {
        footerBrandName.textContent = i18n.t('footer_title', language);
    } else {
        footerSections[0].querySelector('h4').textContent = i18n.t('footer_title', language);
    }
    footerSections[0].querySelector('p').textContent = i18n.t('footer_desc', language);
    
    // Sección 2: Producto
    footerSections[1].querySelector('h4').textContent = i18n.t('footer_product', language);
    const productLinks = footerSections[1].querySelectorAll('a');
    productLinks[0].textContent = i18n.t('footer_features', language);
    productLinks[1].textContent = i18n.t('footer_product_demo', language);
    productLinks[2].textContent = i18n.t('footer_pricing', language);
    productLinks[3].textContent = i18n.t('footer_security', language);
    
    // Sección 3: Empresa
    footerSections[2].querySelector('h4').textContent = i18n.t('footer_company', language);
    const companyLinks = footerSections[2].querySelectorAll('a');
    companyLinks[0].textContent = i18n.t('footer_team', language);
    companyLinks[1].textContent = i18n.t('footer_faq', language);
    companyLinks[2].textContent = i18n.t('footer_contact_nav', language);
    
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
    document.documentElement.setAttribute('lang', currentLang);
    applyDocumentMeta(currentLang);
    document.querySelectorAll('.lang-btn').forEach((btn) => {
        const active = btn.dataset.lang === currentLang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    updatePageContent(currentLang);
    initTeamSlider();

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (!lang || !i18n.translations[lang]) return;
            i18n.setLanguage(lang);
            document.documentElement.setAttribute('lang', lang);
            document.querySelectorAll('.lang-btn').forEach((b) => {
                const on = b.dataset.lang === lang;
                b.classList.toggle('active', on);
                b.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            applyDocumentMeta(lang);
            updatePageContent(lang);
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const lang = i18n.getLanguage();
            const fd = new FormData(contactForm);
            const linesForMail = [];
            fd.forEach((value, key) => {
                linesForMail.push(`${key}: ${value}`);
            });
            const bodyMail = linesForMail.join('\n');
            const subject = encodeURIComponent('Consulta desde la web — SafeFlow');
            const mailtoUrl = `mailto:contacto@safeflow.pe?subject=${subject}&body=${encodeURIComponent(bodyMail)}`;

            const notice = document.getElementById('contactSubmitNotice');
            if (notice) {
                notice.textContent = i18n.t('contact_form_success', lang);
                notice.hidden = false;
                notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            contactForm.reset();

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 0);
        });
    }
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
document.querySelectorAll('.feature-card, .benefit-item, .industry-card, .pricing-card, .step, .value-card, .technology-card, .faq-item').forEach(el => {
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
