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
        if (!shippingDateInput.value || productTypeSelect.value === '') {
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
            // Update the month name based on the selected date
            const monthNameElement = document.querySelector('#month-name-row th');
                        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const selectedDate = new Date(shippingDateInput.value);
            monthNameElement.textContent = monthNames[selectedDate.getMonth()];

            // Determine the calendar start date
            const dayOfWeek = selectedDate.getDay();
            let calendarIndexDate = new Date();
            calendarIndexDate.setTime(selectedDate.getTime() - (7 + dayOfWeek)*1000*60*60*24);
            
            // populate the calendar
            const calendarBody = document.querySelector('#calendar-table tbody');
            for (let i = 0; i < 6; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = calendarIndexDate.getDate();
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
