// Sample data for the days of the month
const augustDays = [
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30]
];

const dayColors = [
    0,0,0,0,0,0,0,
    0,0,0,0,1,1,0,
    0,2,3,3,3,3,0,
    0,3,3,3,3,3,0,
    0,3,1,1,4,0,0,
    0,0,0,0,0,0,0,
]

// Get the calendar table body
const calendarBody = document.querySelector('#calendar-table tbody');

// Populate the calendar table with days and apply colors
for (let i = 0; i < augustDays.length; i++) {
    const week = augustDays[i];
    const colorIndices = dayColors.slice(i * 7, (i + 1) * 7); // Get color indices for the week

    const row = document.createElement('tr');
    for (let j = 0; j < week.length; j++) {
        const day = week[j];
        const cell = document.createElement('td');
        cell.textContent = day;

        // Apply background color based on color index using CSS variables
        if (colorIndices[j] === 0) {
            cell.style.backgroundColor = ''; // No color
        } else if (colorIndices[j] === 1) {
            cell.style.backgroundColor = 'var(--shipping-day-color)'; // Shipping day color
        } else if (colorIndices[j] === 2) {
            cell.style.backgroundColor = 'var(--holiday-day-color)'; // Holiday color
        } else if (colorIndices[j] === 3) {
            cell.style.backgroundColor = 'var(--in-lab-day-color)'; // In-lab day color
        } else if (colorIndices[j] === 4) {
            cell.style.backgroundColor = 'var(--delivery-day-color)'; // Delivery day color
        }

        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

// Get the element that displays the month name
const monthNameElement = document.querySelector('#month-name-row th');

// Update the month name
monthNameElement.textContent = 'September';

// Assume you want to change the color of the date "31" (for example)
const specificDate = document.querySelector('#calendar-table td:contains("31")');

// Get the value of the custom property for shipping day color
const shippingDayColor = getComputedStyle(document.documentElement).getPropertyValue('--shipping-day-color');

// Update the color of the specific date
if (specificDate) {
    specificDate.style.backgroundColor = shippingDayColor;
}