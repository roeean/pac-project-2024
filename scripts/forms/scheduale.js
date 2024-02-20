
const shifts = [
    { name: "08:00 - 12:00" },
    { name: "12:00 - 16:00" },
    { name: "16:00 - 20:00" },
    { name: "20:00 - 00:00" }
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const requiredFields = days.map(day => `${day.toLowerCase()}-shift-`).flatMap(dayId => shifts.flatMap((shift,shiftId) => `${dayId}${shiftId+1}`))
 
console.log(requiredFields)
  
  const customValidations = {
    
  };
  
function populateEmployeeSelectBoxes() {
    const employees = [
        { id: '1', name: 'Roee Angel' },
        { id: '2', name: 'Amit Cohen' },
        { id: '3', name: 'Nimrod Levi' },
        { id: '4', name: 'Shahar Ori' },
        { id: '5', name: 'Liav Basha' },
    ];

    const selectBoxes = document.querySelectorAll('select');
    selectBoxes.forEach(selectBox => {
          employees.forEach(employee => {
            const option = new Option(employee.name, employee.id);
            selectBox.add(option);
        });
    });
}

function generateShiftSchedule() {

    const tbody = document.querySelector('#shift-schedule-table tbody');
    
    shifts.forEach((shift, shiftIndex) => {
        const tr = document.createElement('tr');
        const tdShift = document.createElement('td');
        tdShift.textContent = shift.name;
        tr.appendChild(tdShift);

        days.forEach((day, dayIndex) => {
            const td = document.createElement('td');
            const select = document.createElement('select');
            const input = document.createElement('input');

            select.name = `${day.toLowerCase()}-shift-${shiftIndex + 1}`;
            select.id = select.name;
            select.innerHTML = `<option></option>`; 

            input.type = 'text';
            input.name = `${day.toLowerCase()}-shift-${shiftIndex + 1}-comment`;
            input.placeholder = 'Comment';

            td.appendChild(select);
            td.appendChild(input);
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

  document.addEventListener('DOMContentLoaded', () => {
    generateShiftSchedule();
    populateEmployeeSelectBoxes();

    initializeForm({
      formId: 'shift-schedule-form',
      validations: {
        requiredFields,
        customValidations,
      },
      onSuccess: (data) => {
        console.log(data);
      },
    });
  });
  