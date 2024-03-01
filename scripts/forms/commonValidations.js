const validationPatterns = {
  isEmail: {
    isValid: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
    message: 'Invalid email format',
  },
  isNumber: {
    isValid: (value) => !isNaN(value),
    message: '%field% must contain digits only',
  },
  isDateInPast: {
    isValid: (value) => {
      const date = new Date(value);
      const now = new Date();
      return !isNaN(date.getTime()) && date < now;
    },
    message: 'The date must be in the past',
  },
  isDateNotInFuture: {
    isValid: (value) => {
      const date = new Date(value);
      const now = new Date();
      return !isNaN(date.getTime()) && date <= now;
    },
    message: 'The date must not be in the future',
  },
  isNameValid: {
    isValid: (value) => /^[a-zA-Z ]+$/.test(value.trim()),
    message: '%field% must contain letters and spaces only',
  },
  isLengthInRange: (min, max) => ({
    isValid: (value) => value.trim().length >= min && value.trim().length <= max,
    message: `%field% must be between ${min} and ${max} characters long`,
  }),
  isMaxLength: (max) => ({
    isValid: (value) => value.trim().length <= max,
    message: `%field% must be no more than ${max} characters long`,
  }),
};
