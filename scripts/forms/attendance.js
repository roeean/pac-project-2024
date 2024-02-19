document.addEventListener("DOMContentLoaded", () => {
  initializeForm({
    fromId: "attendance-form",
    validations: {
      requiredFields: ["date", "employee-id", "time-out", "break-comment"],
      customValidations: {
        "employee-id": [
          {
            isValid: (value) => value.trim().length === 9,
            message: "Employee ID must be 9-digit long",
          },
          {
            isValid: (value) => !isNaN(value),
            message: "Employee ID must contain digits only",
          },
        ],
        "time-out": [
          {
            isValid: (value, data) => data["time-in"] <= value,
            message: "Time out must be after time in",
          },
        ],
      },
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // Dynamic display logic based on status field
  const statusField = document.getElementById("status");
  const timeInField = document.getElementById("time-in").parentElement;
  const timeOutField = document.getElementById("time-out").parentElement;

  statusField.addEventListener("change", () => {
    const isAbsent = statusField.value === "absent";
    [timeInField, timeOutField].forEach(
      (field) => (field.style.display = isAbsent ? "none" : "flex")
    );
  });
});
