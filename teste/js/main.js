/**
 * ============================================
 * Main Entry Point
 * ============================================
 */

import { navigation } from './modules/navigation.js';
import { smoothScroll } from './modules/smoothScroll.js';
import { scrollEffects } from './modules/scrollEffects.js';
import { FormValidation } from './modules/formValidation.js';

class App {
    constructor() {
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize core modules
            navigation.init();
            smoothScroll.init();
            scrollEffects.init();

            // Initialize page-specific modules
            this.initContactForm();
            this.initFAQ();
            this.initFilters();
            this.initCounters();

            this.isInitialized = true;
            console.log('TechDev website initialized');

        } catch (error) {
            console.error('App initialization failed:', error);
        }
    }

    initContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            const validator = new FormValidation('contact-form', {
                'contact-name': [
                    value => value ? null : 'Por favor, informe seu nome',
                    value => (value && value.length >= 2) || 'Nome deve ter pelo menos 2 caracteres'
                ],
                'contact-email': [
                    value => value ? null : 'Por favor, informe seu email',
                    value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Por favor, insira um email válido'
                ],
                'contact-message': [
                    value => value ? null : 'Por favor, escreva sua mensagem',
                    value => (value && value.length >= 10) || 'Mensagem deve ter pelo menos 10 caracteres'
                ]
            }, (data) => {
                this.showFormSuccess();
            });

            validator.init();
        }
    }

    showFormSuccess() {
        const formWrapper = document.querySelector('.contact__form-wrapper');
        const successMessage = document.querySelector('.form-success-message');

        if (formWrapper && successMessage) {
            formWrapper.style.display = 'none';
            successMessage.classList.add('form-success-message--visible');
        }
    }

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-item__question');

            if (question) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('faq-item--open');

                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('faq-item--open');
                        }
                    });

                    // Toggle current item
                    item.classList.toggle('faq-item--open', !isOpen);
                });
            }
        });
    }

    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active button
                filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
                btn.classList.add('filter-btn--active');

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.dataset.category;

                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                        card.classList.add('animate-fadeIn');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    initCounters() {
        const counters = document.querySelectorAll('[data-counter]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.counter, 10);
                    this.animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const animate = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        animate();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});