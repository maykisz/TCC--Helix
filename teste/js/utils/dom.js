/**
 * ============================================
 * DOM Utilities
 * ============================================
 */

export const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

export const $$ = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
};

export const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
};

export const addClass = (element, ...classes) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.classList.add(...classes);
};

export const removeClass = (element, ...classes) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.classList.remove(...classes);
};

export const toggleClass = (element, className, force) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.classList.toggle(className, force);
};

export const hasClass = (element, className) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    return element.classList.contains(className);
};

export const show = (element) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.style.display = '';
};

export const hide = (element) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.style.display = 'none';
};

export const on = (element, event, handler, options) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.addEventListener(event, handler, options);
};

export const off = (element, event, handler, options) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    element.removeEventListener(event, handler, options);
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};