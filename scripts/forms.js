//! Form initialization

const initializeForm = (formId, validatorCallback = () => {}) => {
  const form = formId && document.getElementById(formId);
  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = {
        value,
        classes: Array.from(form.elements[key].classList),
      };
    }
    validatorCallback(data);
  });
};

//! Error handling

const getElementById = (id) => document.getElementById(id);

const removeError = (id) => {
  const element = getElementById(id);
  if (!element) return;

  const error = element.parentElement.querySelector(".error-message");
  if (error) error.remove();
  element.classList.remove("error");
};

const addError = (id, message) => {
  const element = getElementById(id);
  if (!element) return;

  removeError(id);
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;
  element.parentElement.appendChild(error);
  element.classList.add("error");
};

const errorHandler = ({ id, message, condition }) => {
  removeError(id);
  if (!condition) {
    addError(id, message);
    return true;
  }
};
