class FormValidator {
  constructor(formId, options = {}, showingLogic = {}) {
    const { customValidations = {}, requiredFields = [] } = options;

    this.form = document.getElementById(formId);
    if (!this.form) throw new Error(`Form with ID "${formId}" not found.`);

    this.errors = new Set();
    this.successes = new Set();

    this.validations = this.initializeValidations(customValidations, requiredFields);
    this.showingLogic = showingLogic;

    this.applyDisplayLogic();
    this.attachEventListeners();
  }

  initializeValidations(customValidations, requiredFields) {
    const validations = { ...customValidations };
    requiredFields.forEach((fieldId) => {
      validations[fieldId] = validations[fieldId] || [];
      validations[fieldId].push({
        isValid: (value) => value.trim() !== '',
        message: `${fieldId.replace('-', ' ')} is required`,
      });
    });
    return validations;
  }

  applyDisplayLogic() {
    Object.entries(this.showingLogic).forEach(([fieldId, displayLogic]) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      this.toggleFieldsDisplay(fieldId, field.value);
    });
  }

  toggleFieldsDisplay(fieldId, fieldValue) {
    const displayLogic = this.showingLogic[fieldId];
    if (!displayLogic) return;

    const fieldsToShow = displayLogic[fieldValue] || [];
    const allPossibleFields = new Set(Object.values(displayLogic).flat());

    allPossibleFields.forEach((id) => {
      const element = document.getElementById(id)?.parentElement;
      if (element) element.style.display = 'none';
      const fieldSpanForField = document.getElementById(`${id}-span`);
      if (fieldSpanForField) {
        fieldSpanForField.classList.add('invisible');
      }
    });

    fieldsToShow.forEach((id) => {
      const element = document.getElementById(id)?.parentElement;
      if (element) element.style.display = '';
      const fieldSpanForField = document.getElementById(`${id}-span`);
      if (fieldSpanForField) {
        fieldSpanForField.classList.remove('invisible');
      }
    });
  }

  attachEventListeners() {
    Object.keys(this.showingLogic).forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      field.addEventListener('change', (e) => this.toggleFieldsDisplay(fieldId, e.target.value));
    });

    this.attachOnChangeValidation();
  }

  attachOnChangeValidation() {
    Object.entries(this.validations).forEach(([fieldId, rules]) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      const debouncedValidate = debounce(() => this.validateField(fieldId, rules, field.value), 1000);
      field.addEventListener('input', debouncedValidate);
    });
  }

  validateField(fieldId, rules, value) {
    this.clearMessage(fieldId);
    const data = this.formData();
    let errorFlag = false;
    rules.forEach(({ isValid, message }) => {
      if (!isValid(value, data)) {
        this.addError(fieldId, message);
        errorFlag = true;
      }
    });
    if (!errorFlag) this.addSuccess(fieldId);
  }

  validateOnSubmit() {
    this.clearAllMessages();

    Object.entries(this.validations).forEach(([fieldId, rules]) => {
      if (!this.isFieldVisible(fieldId)) return;
      const field = document.getElementById(fieldId);
      this.validateField(fieldId, rules, field.value);
    });

    return this.errors.size === 0;
  }

  isFieldVisible(fieldId) {
    const element = document.getElementById(fieldId)?.parentElement;
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none';
  }

  addError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement || !this.isFieldVisible(inputId)) return;

    this.clearMessage(inputId);

    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'error-message';
    errorMessageElement.textContent = message;
    inputElement.parentElement.appendChild(errorMessageElement);
    inputElement.classList.add('error');
    this.errors.add(inputId);

    const fieldSpanForField = document.getElementById(`${inputId}-span`);
    if (fieldSpanForField) {
      fieldSpanForField.classList.add('error');
    }
  }

  addSuccess(inputId) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;

    inputElement.classList.add('success');
    this.successes.add(inputId);

    const fieldSpanForField = document.getElementById(`${inputId}-span`);
    if (fieldSpanForField) {
      fieldSpanForField.classList.add('success');
    }
  }

  clearMessage(inputId) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;

    const errorElement = inputElement.parentElement.querySelector('.error-message');
    if (errorElement) errorElement.remove();
    inputElement.classList.remove('error');
    inputElement.classList.remove('success');

    const fieldSpanForField = document.getElementById(`${inputId}-span`);
    if (fieldSpanForField) {
      fieldSpanForField.classList.remove('error');
      fieldSpanForField.classList.remove('success');
    }

    this.errors.delete(inputId);
    this.successes.delete(inputId);
  }

  formData() {
    return Object.fromEntries(new FormData(this.form).entries());
  }

  clearAllMessages() {
    this.errors.forEach((id) => this.clearMessage(id));
    this.successes.forEach((id) => this.clearMessage(id));
  }
}

const initializeForm = ({ formId, validations, showingLogic, onSuccess }) => {
  const formValidator = new FormValidator(formId, validations, showingLogic);

  formValidator.form.addEventListener('reset', () => {
    formValidator.clearAllMessages();
  });

  formValidator.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValidData = formValidator.validateOnSubmit();
    if (isValidData) onSuccess(formValidator.formData());
  });
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
