const requiredFields = [
  "first-name",
  "last-name",
  "date-of-birth",
  "identity-number",
  "email",
  "phone-number",
  "address",
  "employee-id",
  "department",
  "position",
  "start-date",
  "employment-type",
  "preferred-shift",
  "additional-preferences",
];

const customValidations = {
  'first-name': [validationPatterns.isNameValid],
  'last-name': [validationPatterns.isNameValid],
  'date-of-birth': [validationPatterns.isDateInPast],
  'identity-number': [validationPatterns.isLengthInRange(5, 20)],
  'email': [validationPatterns.isEmail],
  'phone-number': [
    validationPatterns.isNumber,
    validationPatterns.isLengthInRange(10,15), // Adjusted to the correct range as per your requirements
  ],
  'employee-id': [
    validationPatterns.isDigitsOnly,
    validationPatterns.isLengthInRange(2, 9), // Adjusted to the correct range as per your requirements
  ],
  'start-date': [validationPatterns.isDateNotInFuture],
  'additional-preferences': [validationPatterns.isMaxLength(500)],
};

document.addEventListener('DOMContentLoaded', () => {
  initializeForm({
    formId: 'register-form',
    validations: {
      requiredFields,
      customValidations
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
});
