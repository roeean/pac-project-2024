document.addEventListener("DOMContentLoaded", () => {
  initializeForm("attendance-form", {
    requiredFields: ["date", "employee-id"],
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
