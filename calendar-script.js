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
    });
});