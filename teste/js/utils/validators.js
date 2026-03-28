
/**
 * ============================================
 * Form Validators
 * ============================================
 */

export const Validators = {
    required(value) {
        if (value === null || value === undefined) {
            return 'Este campo é obrigatório';
        }
        if (typeof value === 'string' && value.trim() === '') {
            return 'Este campo é obrigatório';
        }
        return null;
    },

    minLength(value, min) {
        if (!value || value.length < min) {
            return `Este campo deve ter pelo menos ${min} caracteres`;
        }
        return null;
    },

    maxLength(value, max) {
        if (value && value.length > max) {
            return `Este campo deve ter no máximo ${max} caracteres`;
        }
        return null;
    },

    email(value) {
        if (!value) return null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Por favor, insira um email válido';
        }
        return null;
    },

    phone(value) {
        if (!value) return null;
        const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
        if (!phoneRegex.test(value)) {
            return 'Por favor, insira um telefone válido';
        }
        return null;
    },

    url(value) {
        if (!value) return null;
        try {
            new URL(value);
            return null;
        } catch {
            return 'Por favor, insira uma URL válida';
        }
    }
};

export const validateField = (input, rules) => {
    const value = input.type === 'checkbox' ? input.checked : input.value;
    const errorElement = document.getElementById(`${input.id}-error`);

    for (const rule of rules) {
        const error = rule(value);
        if (error) {
            input.classList.add('form-input--error');
            input.classList.remove('form-input--valid');
            if (errorElement) {
                errorElement.textContent = error;
                errorElement.classList.add('form-error--visible');
            }
            return false;
        }
    }

    input.classList.remove('form-input--error');
    input.classList.add('form-input--valid');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('form-error--visible');
    }

    return true;
};

export const validateForm = (form, validationRules) => {
    let isValid = true;

    Object.entries(validationRules).forEach(([fieldId, rules]) => {
        const input = document.getElementById(fieldId);
        if (input && !validateField(input, rules)) {
            isValid = false;
        }
    });

    return isValid;
};