const datepicker = document.querySelector(".datepicker");
const dateInput = document.querySelector(".date-input");
const yearInput = datepicker.querySelector(".year-input");
const monthInput = datepicker.querySelector(".month-input");
const cancelBtn = datepicker.querySelector(".cancel");
const applyBtn = datepicker.querySelector(".apply");
const nextBtn = datepicker.querySelector(".next");
const prevBtn = datepicker.querySelector(".prev");
const dates = datepicker.querySelector(".dates");

let selectDate = new Date();
let year = selectDate.getFullYear();
let month = selectDate.getMonth();

// Show datepicker
dateInput.addEventListener("click", () => {
    datepicker.hidden = false;
});

// Hide datepicker
cancelBtn.addEventListener("click", () => {
    datepicker.hidden = true;
});

// Handle apply button click event
applyBtn.addEventListener("click", () => {
    // Set the selected date to the date input
    dateInput.value = selectDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    // Hide datepicker
    datepicker.hidden = true;
});

// Next month navigation
nextBtn.addEventListener("click", () => {
    if (month === 11) year++;
    month = (month + 1) % 12;
    displayDates();
});

// Previous month navigation
prevBtn.addEventListener("click", () => {
    if (month === 0) year--;
    month = (month - 1 + 12) % 12;
    displayDates();
});

// Input month change event
monthInput.addEventListener('change', () => {
    month = monthInput.selectedIndex;
    displayDates();
});

// Input year change event
yearInput.addEventListener('change', () => {
    year = parseInt(yearInput.value);
    displayDates();
});

const updateYearMonth = () => {
    monthInput.selectedIndex = month;
    yearInput.value = year;
};

const handleDateClick = (e) => {
    const button = e.target;
    // Remove the 'selected' class from other buttons
    const selected = dates.querySelector('.selected');
    selected && selected.classList.remove('selected');
    // Add the 'selected' class to current button
    button.classList.add("selected");
    // Set the selected date
    selectDate = new Date(year, month, parseInt(button.textContent));
};

const displayDates = () => {
    // Update year & month
    updateYearMonth();

    // Clear dates
    dates.innerHTML = "";

    // Display the last week of the previous month
    const lastOfPrevMonth = new Date(year, month, 0);
    const daysToDisplay = lastOfPrevMonth.getDay();
    for (let i = daysToDisplay; i > 0; i--) {
        const text = lastOfPrevMonth.getDate() - i + 1;
        const button = createButton(text, true);
        dates.appendChild(button);
    }

    // Display the current month
    const lastOfMonth = new Date(year, month + 1, 0);
    for (let i = 1; i <= lastOfMonth.getDate(); i++) {
        const button = createButton(i, false);
        button.addEventListener('click', handleDateClick);
        dates.appendChild(button);
    }

    // Display the first week of the next month
    const firstOfNextMonth = new Date(year, month + 1, 1);
    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
        const text = i - firstOfNextMonth.getDay() + 1;
        const button = createButton(text, true);
        dates.appendChild(button);
    }
};

const createButton = (text, isDisable = false) => {
    const currentDate = new Date();

    // Check if the current button is today's date
    const isToday = 
        currentDate.getDate() === text &&
        currentDate.getFullYear() === year &&
        currentDate.getMonth() === month;
        
    // Check if the current button is the selected date
    const isSelected = 
        selectDate.getDate() === text &&
        selectDate.getFullYear() === year &&
        selectDate.getMonth() === month;

    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisable;
    button.classList.toggle("today", isToday);
    button.classList.toggle("selected", isSelected);
    return button;
};

// Initial display
displayDates();
