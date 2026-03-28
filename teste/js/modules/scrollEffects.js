
/**
 * ============================================
 * Scroll Effects Module
 * ============================================
 */

import { $$, addClass, removeClass } from '../utils/dom.js';

class ScrollEffects {
    constructor() {
        this.elements = [];
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        // Observe elements with data-animate attribute
        const animatedElements = $$('[data-animate]');
        animatedElements.forEach(el => {
            this.observer.observe(el);
        });

        // Observe section elements
        const sections = $$('section');
        sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    animateElement(element) {
        const animationType = element.dataset.animate || 'fadeInUp';
        addClass(element, `animate-${animationType}`);
        removeClass(element, 'opacity-0');
    }

    // Counter animation for statistics
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

export const scrollEffects = new ScrollEffects();