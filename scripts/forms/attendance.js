const validator = (data) => {
  //! Employee ID must be 9 characters long

  const validations = [
    {
      id: "employee-id",
      message: `Employee ID must be 9 characters long`,
      condition: data["employee-id"]?.value.length === 9,
    },
    {
      id: "time-out",
      message: `Time out must be after time in`,
      condition: data["time-in"]?.value <= data["time-out"]?.value,
    },
  ];

  const isHasError = validations.some(errorHandler);
  console.log({ isHasError });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeForm("attendance-form", validator);
});
