document.addEventListener('DOMContentLoaded', function() {
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const calendarBody = document.getElementById('calendar-body');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function populateMonthSelect() {
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            monthSelect.appendChild(option);
        });
    }

    function populateYearSelect() {
        for (let i = currentYear - 524; i <= currentYear + 526; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    function renderCalendar(month, year) {
        calendarBody.innerHTML = '';
        monthSelect.value = month;
        yearSelect.value = year;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.textContent = date;
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    monthSelect.addEventListener('change', () => {
        currentMonth = parseInt(monthSelect.value);
        renderCalendar(currentMonth, currentYear);
    });

    yearSelect.addEventListener('change', () => {
        currentYear = parseInt(yearSelect.value);
        renderCalendar(currentMonth, currentYear);
    });

    populateMonthSelect();
    populateYearSelect();
    renderCalendar(currentMonth, currentYear);
});
