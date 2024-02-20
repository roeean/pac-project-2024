const requiredFields = [
  'shift-name',
  'start-time',
  'end-time',
  'frequency',
  'start-date',
  'end-date',
  'assigned-employees',
];

const customValidations = {
  'end-time': [
    {
      isValid: (value, data) => data['start-time'] <= value,
      message: 'Time end must be after time start',
    },
  ],
  'end-date': [
    {
      isValid: (value, data) => data['start-date'] <= value,
      message: 'Date end must be after date start',
    },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  initializeForm({
    formId: 'recurring-shift-form',
    validations: {
      requiredFields,
      customValidations,
    },
    showingLogic: {
      frequency: {
        weekly: ['workdays-sunday', 'workdays-monday','workdays-tuesday', 'workdays-wednesday', 'workdays-thursday', 'workdays-friday', 'workdays-saturday'],
        'bi-weekly': ['workdays-sunday', 'workdays-monday','workdays-tuesday', 'workdays-wednesday', 'workdays-thursday', 'workdays-friday', 'workdays-saturday'],
      },
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
});
