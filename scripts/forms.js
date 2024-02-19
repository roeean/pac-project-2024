class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) throw new Error(`Form with ID "${formId}" not found.`);
    this.errors = [];
  }

  addError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;

    this.clearError(inputId); // Ensure any previous error messages are cleared
    const errorMessageElement = document.createElement("div");
    errorMessageElement.className = "error-message";
    errorMessageElement.textContent = message;
    inputElement.parentElement.appendChild(errorMessageElement);
    inputElement.classList.add("error");
  }

  clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;

    const errorElement =
      inputElement.parentElement.querySelector(".error-message");
    if (errorElement) errorElement.remove();
    inputElement.classList.remove("error");
  }

  clearAllErrors() {
    this.errors.forEach(({ id }) => this.clearError(id));
    this.errors = []; // Reset the errors array after clearing
  }

  validateOnSubmit({ requiredFields = [], customValidations = {} }, data = {}) {
    this.clearAllErrors(); // Reset errors before new validation

    // Handle required fields
    requiredFields.forEach((id) => {
      const inputElement = document.getElementById(id);
      if (inputElement && inputElement.value.trim() === "") {
        this.addError(id, `${id} is required`);
        this.errors.push({ id, message: `${id} is required` });
      }
    });

    // Handle custom validations
    Object.entries(customValidations).forEach(([id, validations]) => {
      validations.forEach(({ isValid, message }) => {
        const inputValue = document.getElementById(id).value;
        if (!isValid(inputValue, data)) {
          this.addError(id, message);
          this.errors.push({ id, message });
        }
      });
    });

    return this.errors.length === 0; // Return true if no errors, otherwise false
  }

  attachOnChangeValidation(validations) {
    Object.entries(validations.customValidations).forEach(
      ([fieldId, rules]) => {
        const field = document.getElementById(fieldId);
        if (!field) return;

        field.addEventListener("change", () => {
          this.clearError(fieldId);

          rules.forEach(({ isValid, message }) => {
            const value = field.value;
            const data = Object.fromEntries(new FormData(this.form).entries());
            if (!isValid(value, data)) {
              this.addError(fieldId, message);
            }
          });
        });
      }
    );
  }
}

const initializeForm = (formId, validations) => {
  const formValidator = new FormValidator(formId);

  // Attach on-change validation for specified fields
  formValidator.attachOnChangeValidation(validations);

  // Handle form submission
  formValidator.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(formValidator.form).entries());

    // Perform full form validation on submit
    if (formValidator.validateOnSubmit(validations, data)) {
      console.log("Form is valid", data);
      // Form submission logic here (e.g., AJAX request)
    } else {
      console.log("Form validation failed");
      // Optionally focus the first input with an error
    }
  });
};
