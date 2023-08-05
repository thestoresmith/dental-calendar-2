// Sample data for the days of the month
const augustDays = [
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30]
];

// Get the calendar grid body
const calendarBody = document.querySelector('#calendar-grid tbody');

// Populate the calendar grid with days
for (const week of augustDays) {
    const row = document.createElement('tr');
    for (const day of week) {
        const cell = document.createElement('td');
        cell.textContent = day;
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}