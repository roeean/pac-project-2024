const requiredFields = [
  'employee-id',
  'date',
  'status',
  'time-in',
  'time-out'
];

const customValidations = {
  'employee-id': [
    validationPatterns.isDigitsOnly,
    validationPatterns.isLengthInRange(2, 9), 
  ],
  'time-out': [
    {
      isValid: (value, data) => data['time-in'] <= value,
      message: 'Time out must be after time in',
    },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  initializeForm({
    formId: 'attendance-form',
    validations: {
      requiredFields,
      customValidations,
    },
    showingLogic: {
      status: {
        present: ['time-in', 'time-out'],
      },
    },
    onSuccess: (data) => {
      alert('Form submitted successfully!, check the console for the data');
      console.log(data);
    },
  });
});
