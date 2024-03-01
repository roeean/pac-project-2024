const requiredFields = ['employee-id', 'employee-email', 'contact-number', 'support-type', 'support-description'];

const customValidations = {
  'employee-id': [validationPatterns.isNumber, validationPatterns.isLengthInRange(2, 9)],
  'employee-email': [validationPatterns.isEmail],
  'contact-number': [validationPatterns.isNumber, validationPatterns.isLengthInRange(10, 15)],
};

document.addEventListener('DOMContentLoaded', () => {
  initializeForm({
    formId: 'support-form',
    validations: {
      requiredFields,
      customValidations,
    },
    onSuccess: (data) => {
      alert('Form submitted successfully!, check the console for the data');
      console.log(data);
    },
  });
});
