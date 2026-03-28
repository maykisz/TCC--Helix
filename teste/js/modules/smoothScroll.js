

/**
 * ============================================
 * Smooth Scroll Module
 * ============================================
 */

import { $, on } from '../utils/dom.js';

class SmoothScroll {
    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            on(anchor, 'click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = $(href);

        if (target) {
            e.preventDefault();

            const headerHeight = 72; // Adjust based on your header height
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL hash without jumping
            history.pushState(null, null, href);
        }
    }
}

export const smoothScroll = new SmoothScroll();