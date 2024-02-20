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
    validationPatterns.isLengthInRange(2, 9), // Adjusted to the correct range as per your requirements
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
      console.log(data);
    },
  });
});
