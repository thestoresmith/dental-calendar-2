// Set up the page with sample data
// Sample data for the days of the month
const sampleDays = [
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
for (let i = 0; i < sampleDays.length; i++) {
    const week = sampleDays[i];
    const colorIndices = dayColors.slice(i * 7, (i + 1) * 7); // Get color indices for the week

    const row = document.createElement('tr');
    for (let j = 0; j < week.length; j++) {
        const day = week[j];
        const cell = document.createElement('td');
        cell.textContent = day;

        // Apply background color based on color index using CSS variables
        if (colorIndices[j] === 0) {
            cell.style.backgroundColor = ''; // No special color
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
monthNameElement.textContent = 'Example';

const inLabDaysPlaceholder = document.getElementById('in-lab-days-placeholder');
const inLabDays = 10; // The number of In-Lab Days (modify as needed)
inLabDaysPlaceholder.textContent = inLabDays.toString();

// End of setting up the page with sample data

const shippingForm = document.getElementById('shipping-form');
const shippingDateInput = document.getElementById('shipping-date');
const productTypeSelect = document.getElementById('product-type');
shippingForm.addEventListener('submit', function (event) {
    if (!shippingDateInput.value || productTypeSelect.value === '') {
        event.preventDefault(); // Prevent form submission if validation fails

        // Display an error message to the user (you can modify this part)
        alert('Please select a date and a product.');

        // Highlight the invalid fields
        if (!shippingDateInput.value) {
            shippingDateInput.classList.add('invalid');
        }
        if (productTypeSelect.value === '') {
            productTypeSelect.classList.add('invalid');
        }
    } else {
        // Clear existing calendar days
        const rowsToRemove = document.querySelectorAll('#calendar-table tbody tr:not(#day-name-row)');
        rowsToRemove.forEach(row => {
            calendarBody.removeChild(row);
        });

        // Get the selected shipping date
        const selectedDate = new Date(shippingDateInput.value);

        // Update the month name based on the selected date
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthNameElement.textContent = monthNames[selectedDate.getMonth()];

        // ... (populate the calendar with appropriate days)
    }
});