const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];

const monthDays = {
    january: 31,
    february: 28,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
};

const currentInfo = {
    date: null,
    month: null,
    monthText: null,
    year: null,
    clickedNext: false,
    clickedTrue: false,
    direction: 0,
    leapyear: false,
    activeDate: null,
    activeMonth: null,
    activeYear: null
};

let d = new Date();

let day = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();

currentInfo.day = day;
currentInfo.month = month;
currentInfo.year = year;
currentInfo.direction = 0;
monthSelect();

function leapyear(year) {
    let leap = false;
    if (year % 4 == 0) {
        leap = true;
    }
    if (year % 100 == 0) {
        leap = false;
    }
    if (year % 400 == 0) {
        leap = true;
    }
    currentInfo.leapyear = leap;
    //return leap;
    if (leap && currentInfo.month == 1) {
        return 1;
    } else {
        return 0;
    }
}

function createYear() {
    let yearInput = document.createElement('input');
    yearInput.id = "yearInput";
    yearInput.value = currentInfo.year;
    yearInput.classList.add("input");
    document.getElementById('year').append(yearInput);
}
createYear();

function calUpdate() {
    let firstDay = (new Date(currentInfo.year, currentInfo.month)).getDay();
    let daysInMonth = 32 - new Date(currentInfo.year, currentInfo.month, 32).getDate();
    let daysInPrevMonth = 32 - new Date(currentInfo.year, currentInfo.month - 1, 32).getDate();
    let tbl = document.getElementById("days");

    if (currentInfo.month == -1) {
        currentInfo.month = 11;
        currentInfo.year = currentInfo.year - 1;
    }
    if (currentInfo.month == 12) {
        currentInfo.month = 0;
        currentInfo.year = currentInfo.year + 1;
    }
    currentInfo.monthText = months[currentInfo.month];
    document.getElementById("month-select").selectedIndex = currentInfo.month;
    document.getElementById("yearInput").value = currentInfo.year;
    let date = 1;
    let dateN = 1;
    for (let x = 0; x < 6; x++) {
        let row = document.createElement('tr');
        row.classList.add("tr");

        for (let y = 0; y < 7; y++) {
            if ((x === 0 && y < firstDay)) {
                let cell = document.createElement('td');
                cell.classList.add("td");
                let CellText = document.createTextNode('');
                cell.classList.add("prevMonth");
                cell.appendChild(CellText);
                row.appendChild(cell);

            } else if (date > daysInMonth) {
                let cell = document.createElement('td');
                cell.classList.add("td");
                let CellText = document.createTextNode(dateN);
                cell.classList.add("nextMonth");
                cell.appendChild(CellText);
                row.appendChild(cell);
                dateN++;
            } else {
                let cell = document.createElement('td');
                cell.classList.add("td");
                let CellText = document.createTextNode(date);
                if (date === d.getDate() && year === d.getFullYear() && month === d.getMonth()) {
                    cell.classList.add("bg-info");
                }
                cell.appendChild(CellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);

    }
    let daysInPrevMonthD = daysInPrevMonth - document.querySelectorAll(".prevMonth").length + 1;
    for (let p = 0; p < document.querySelectorAll(".prevMonth").length; p++) {

        document.querySelectorAll(".prevMonth")[p].innerHTML = daysInPrevMonthD;
        daysInPrevMonthD++;
    }

}

calUpdate();

function clearCalendar() {
    document.getElementById("days").innerHTML = "";
}

function nextMonth() {
    clearCalendar();
    currentInfo.clickedNext = true;
    currentInfo.month++
    calUpdate();
}

function prevMonth() {
    clearCalendar();
    currentInfo.clickedPrev = true;
    currentInfo.month--
    calUpdate();
}

function monthSelect() {
    let oM = document.createElement("select");
    oM.id = "month-select";
    for (let m = 0; m < months.length; m++) {
        let option = document.createElement("option");
        option.text = months[m];
        option.value = m;
        oM.add(option);
    }
    oM.selectedIndex = currentInfo.month;
    document.getElementById("month-text").appendChild(oM);

}

function monthSelectUpdate(e) {
    let m = e.target.selectedIndex;
    currentInfo.month = parseInt(m);
    clearCalendar();
    calUpdate();
}

function yearInputUpdate(e) {
    let y = e.target.value;
    console.log(e);
    currentInfo.year = parseInt(y);
    clearCalendar();
    calUpdate();
}

document.querySelector('.next').addEventListener('click', nextMonth);
document.querySelector('.prev').addEventListener('click', prevMonth);
document.getElementById("month-select").addEventListener('change', monthSelectUpdate);
document.getElementById("yearInput").addEventListener("focusout", yearInputUpdate);
addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        yearInputUpdate(event);
        console.log("ran")
    }
});