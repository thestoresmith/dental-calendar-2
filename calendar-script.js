document.addEventListener("DOMContentLoaded", function () {
    const calendarTableContainer = document.getElementById("calendar-table-container");
    const calendarLegendContainer = document.getElementById("calendar-legend-container");
    const submitButton = document.getElementById("submit-button");
    calendarTableContainer.style.display = "none";
    calendarLegendContainer.style.display = "none";
  
    submitButton.addEventListener("click", function (event) {
        event.preventDefault()
        const shippingDateInput = document.getElementById('shipping-date');
        const productTypeSelect = document.getElementById('product-type');
        // data validation
        if (!shippingDateInput.value || productTypeSelect.value === '') {
            // display an error message to the user (you can modify this part)
            alert('Please select a date and a product.');

            // highlight the invalid fields
            if (!shippingDateInput.value) {
                shippingDateInput.classList.add('invalid');
            }
            if (productTypeSelect.value === '') {
                productTypeSelect.classList.add('invalid');
            }
        } else {  
            // data is good to go
            // update the month name based on the selected date
            const monthNameElement = document.querySelector('#month-name-row th');
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const selectedDate = new Date(shippingDateInput.value);
            monthNameElement.textContent = monthNames[selectedDate.getUTCMonth()];

            // determine number of days in lab based on product
            let labDays = getNumLabDays(productTypeSelect.value);
            const inLabDaysElement = document.getElementById('in-lab-days');
            inLabDaysElement.textContent = labDays.toString();

            // clear out any existing calendar dates
            const calendarBody = document.querySelector('#calendar-table tbody');
            const dateCells = calendarBody.querySelectorAll('td');
            dateCells.forEach(cell => {
                cell.remove();
            });

            // determine the calendar start date
            const dayOfWeek = selectedDate.getUTCDay();
            let calendarIndexDate = new Date();
            calendarIndexDate.setTime(selectedDate.getTime() - (7 + dayOfWeek)*1000*60*60*24);
            
            // populate the calendar
            let colorState = 'init';
            let shipDays;
            for (let i = 0; i < 6; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = calendarIndexDate.getUTCDate();

                    // determine background color
                    if ((colorState == 'init') && (calendarIndexDate.getUTCDate() == selectedDate.getUTCDate())) {
                        // index has reached the initial ship date
                        colorState = 'ship one';
                        shipDays = 2;
                    }
                    const localDayOfWeek = calendarIndexDate.getUTCDay();
                    const isHoliday = getIsHoliday(calendarIndexDate);
                    if (isHoliday) {
                        if ((colorState === 'init')||(colorState === 'done')) {
                            // no coloring for these states
                        } else {
                            cell.style.backgroundColor = 'var(--holiday-day-color)';
                        }
                    } else if (!localDayOfWeek) {
                        // Sunday - no color
                    } else {                
                        switch (colorState) {
                            case 'init':
                                break;
                            case 'ship one':
                                    cell.style.backgroundColor = 'var(--shipping-day-color)';
                                    shipDays--;
                                    if (shipDays == 0) {
                                        colorState = 'lab';
                                    }
                                break;
                            case 'lab':
                                if (localDayOfWeek == 6){
                                    // Saturday - no color
                                } else {
                                    cell.style.backgroundColor = 'var(--in-lab-day-color)';
                                    labDays--;
                                    if (labDays == 0) {
                                        colorState = 'ship two';
                                        shipDays=2;
                                    }
                                }
                                break;
                            case 'ship two':
                                cell.style.backgroundColor = 'var(--shipping-day-color)';
                                shipDays--;
                                if (shipDays == 0) {
                                    colorState = 'delivery';
                                }
                                break;
                            case 'delivery':
                                cell.style.backgroundColor = 'var(--delivery-day-color)';
                                colorState = 'done';
                                break;
                            case 'done':
                                break;
                            default:
                        }
                    }

                    row.appendChild(cell);
                    // increment the calendarIndexDate var
                    calendarIndexDate.setTime(calendarIndexDate.getTime() + 1000*60*60*24);
                }
                calendarBody.appendChild(row);
            }

            // make the calendar and legend visible
            calendarTableContainer.style.display = "block";
            calendarLegendContainer.style.display = "flex";
        }
    });
});

function getIsHoliday(date) {
    const holidaysArray = [
        // 2023 Holidays
        '2023-09-04', // Labor Day
        '2023-10-09', // Columbus Day
        '2023-11-11', // Veterans Day
        '2023-11-23', // Thanksgiving Day
        '2023-12-25', // Christmas Day
    
        // 2024 Holidays
        '2024-01-01', // New Year's Day
        '2024-01-15', // Martin Luther King Jr. Day
        '2024-02-19', // Presidents Day
        '2024-05-27', // Memorial Day
        '2024-06-19', // Juneteenth
        '2024-07-04', // Independence Day
        '2024-09-02', // Labor Day
        '2024-10-14', // Columbus Day
        '2024-11-11', // Veterans Day
        '2024-11-28', // Thanksgiving Day
        '2024-12-25'  // Christmas Day
    ];
    const isoDate = date.toISOString().split('T')[0];
    return holidaysArray.includes(isoDate);
}

function getNumLabDays(productValue){
    switch (productValue) {
        case 'acrylic-partials':
            return 4;
        case 'bleach-trays':
            return 3;
        case 'custom-tray':
            return 3;
        case 'crown-bridge-implant':
            return 12;
        case 'crown-bridge-other':
            return 10;
        case 'denture-set-up':
            return 4;
        case 'metal-frame-partials':
            return 6;
        case 'night-guard-splints':
            return 5;
        case 'process-finish':
            return 3;
        case 'repairs':
            return 0;
        case 'second-day-conversion':
            return 1;
        case 'second-day-trefoil':
            return 1;
        case 'wax-rims':
            return 3;
        default:
            return 'Task duration not found';
    }
}

