const initializeLogin = () => {
  document.getElementById('login-btn').onclick = () => {
    document.getElementById('login-dialog').style.display = 'block';
  };

  document.querySelector('.close-button').onclick = () => {
    document.getElementById('login-dialog').style.display = 'none';
  };

  window.onclick = (event) => {
    let modal = document.getElementById('login-dialog');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  initializeForm({
    formId: 'login-form',
    validations: {
      requiredFields: ['username', 'password'],
      customValidations: {
        username: [
          {
            isValid: (value) => /^[a-zA-Z0-9_]+$/.test(value),
            message: 'Username must contain only latins letters, digits, and underscores',
          },
        ],
        password: [
          {
            isValid: (value) => value.trim().length >= 8,
            message: 'Password must be at least 8 characters long',
          },
          {
            isValid: (value) => /[a-z]/.test(value),
            message: 'Password must contain at least one lowercase letter',
          },
          {
            isValid: (value) => /[A-Z]/.test(value),
            message: 'Password must contain at least one uppercase letter',
          },
          {
            isValid: (value) => /[0-9]/.test(value),
            message: 'Password must contain at least one digit',
          },
          {
            isValid: (value) => /[^a-zA-Z0-9]/.test(value),
            message: 'Password must contain at least one special character',
          },
        ],
      },
    },
    showingLogic: {},
    onSuccess: (data) => {
      alert('Login successful');
      document.getElementById('login-dialog').style.display = 'none';
    },
  });
};

document.addEventListener('DOMContentLoaded', initializeLogin);
