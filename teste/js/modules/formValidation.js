/**
 * ============================================
 * Form Validation Module
 * ============================================
 */

import { $, $$, on, addClass, removeClass } from '../utils/dom.js';
import { validateField, validateForm } from '../utils/validators.js';

class FormValidation {
    constructor(formId, validationRules, onSuccess) {
        this.form = $(`#${formId}`);
        this.validationRules = validationRules;
        this.onSuccess = onSuccess;
    }

    init() {
        if (!this.form) return;

        this.bindEvents();
    }

    bindEvents() {
        // Form submission
        on(this.form, 'submit', (e) => this.handleSubmit(e));

        // Real-time validation on blur
        Object.keys(this.validationRules).forEach(fieldId => {
            const input = $(`#${fieldId}`);
            if (input) {
                on(input, 'blur', () => validateField(input, this.validationRules[fieldId]));
                on(input, 'input', () => {
                    // Clear error on input
                    const errorElement = $(`#${fieldId}-error`);
                    if (errorElement) {
                        errorElement.classList.remove('form-error--visible');
                    }
                    removeClass(input, 'form-input--error');
                });
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const isValid = validateForm(this.form, this.validationRules);

        if (isValid) {
            this.handleSuccess();
        }
    }

    handleSuccess() {
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';

            // Simulate API call
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                if (typeof this.onSuccess === 'function') {
                    this.onSuccess(data);
                }
            }, 1500);
        }
    }
}

export { FormValidation };