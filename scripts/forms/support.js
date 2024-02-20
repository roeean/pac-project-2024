const requiredFields = [
  'employee-id',
  'employee-email',
  'contact-number',
  'support-type',
  'support-description',
];

const customValidations = {
  'employee-id': [
    validationPatterns.isDigitsOnly,
    validationPatterns.isLengthInRange(2, 9), // Adjusted to the correct range as per your requirements
  ],
  'employee-email': [validationPatterns.isEmail],
  'contact-number': [validationPatterns.isDigitsOnly, validationPatterns.isLengthInRange(10, 15)],
  
};

document.addEventListener('DOMContentLoaded', () => {
  initializeForm({
    formId: 'support-form',
    validations: {
      requiredFields,
      customValidations,
    },
    onSuccess: (data) => {
      alert('Form submitted successfully!, check the console for the data', data);
      console.log(data);
    },
  });
});
