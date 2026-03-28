
/**
 * ============================================
 * Navigation Module
 * ============================================
 */

import { $, $$, addClass, removeClass, hasClass, on, off } from '../utils/dom.js';

class Navigation {
    constructor() {
        this.header = null;
        this.menuToggle = null;
        this.mobileMenu = null;
        this.isOpen = false;
        this.lastScrollY = 0;
    }

    init() {
        this.header = $('.header');
        this.menuToggle = $('.menu-toggle');
        this.mobileMenu = $('.mobile-menu');

        if (!this.header) return;

        this.bindEvents();
        this.setActiveLink();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.menuToggle) {
            on(this.menuToggle, 'click', () => this.toggleMobileMenu());
        }

        // Close mobile menu on link click
        const mobileLinks = $$('.mobile-menu__link');
        mobileLinks.forEach(link => {
            on(link, 'click', () => this.closeMobileMenu());
        });

        // Close mobile menu on escape key
        on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        on(window, 'resize', () => {
            if (window.innerWidth >= 768 && this.isOpen) {
                this.closeMobileMenu();
            }
        });

        // Header scroll effect
        on(window, 'scroll', () => this.handleScroll(), { passive: true });
    }

    toggleMobileMenu() {
        if (this.isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isOpen = true;
        addClass(this.menuToggle, 'menu-toggle--active');
        addClass(this.mobileMenu, 'mobile-menu--active');
        addClass(document.body, 'overflow-hidden');

        // Set aria attributes
        if (this.menuToggle) {
            this.menuToggle.setAttribute('aria-expanded', 'true');
        }
        if (this.mobileMenu) {
            this.mobileMenu.setAttribute('aria-hidden', 'false');
        }
    }

    closeMobileMenu() {
        this.isOpen = false;
        removeClass(this.menuToggle, 'menu-toggle--active');
        removeClass(this.mobileMenu, 'mobile-menu--active');
        removeClass(document.body, 'overflow-hidden');

        // Set aria attributes
        if (this.menuToggle) {
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
        if (this.mobileMenu) {
            this.mobileMenu.setAttribute('aria-hidden', 'true');
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class for shadow
        if (scrollY > 10) {
            addClass(this.header, 'header--scrolled');
        } else {
            removeClass(this.header, 'header--scrolled');
        }

        this.lastScrollY = scrollY;
    }

    setActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = $$('.nav__link, .mobile-menu__link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Check if it's the current page
            if (href === currentPath ||
                (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/'))) ||
                (href !== 'index.html' && currentPath.includes(href))) {
                addClass(link, 'nav__link--active');
                addClass(link, 'mobile-menu__link--active');
            }
        });
    }
}

export const navigation = new Navigation();
