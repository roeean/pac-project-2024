document.addEventListener('DOMContentLoaded', () => {
  initializeForm({
    formId: 'attendance-form',
    validations: {
      requiredFields: ['employee-id', 'date', 'status', 'time-in', 'time-out'],
      customValidations: {
        'employee-id': [
          {
            isValid: (value) => value.trim().length === 9,
            message: 'Employee ID must be 9-digit long',
          },
          {
            isValid: (value) => !isNaN(value),
            message: 'Employee ID must contain digits only',
          },
        ],
        'time-out': [
          {
            isValid: (value, data) => data['time-in'] <= value,
            message: 'Time out must be after time in',
          },
        ],
      },
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
