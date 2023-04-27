
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timer = document.querySelector(".timer");
const digits = document.querySelectorAll(".value");
const inputField = document.querySelector('input[type="text');
const startButton = document.querySelector("button");
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

timer.style.width = "230px";
timer.style.display = "flex";
timer.style.background = "linear-gradient(blue, pink)";
digits.forEach(element => element.style.fontSize = "36px");
startButton.setAttribute('disabled', true);

let ms = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > options.defaultDate) {
            const dateEvent = selectedDates[0]; 
            const dateToday = options.defaultDate;
            ms = (dateEvent.getTime() - dateToday.getTime());
            startButton.removeAttribute('disabled');
        } else {
            window.alert("Please choose a date in the future");
        }
    }, 
};

inputField.addEventListener("input", flatpickr(inputField, options));

let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  days = Math.floor(ms / day);
  // Remaining hours
  hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  seconds = Math.floor((((ms % day) % hour) % minute) / second);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
};

startButton.addEventListener('click', () => {
    document.getElementById("datetime-picker").disabled = true;
    startButton.setAttribute('disabled', true);
    const timerId = setInterval(() => {
        ms = ms - 1000;
        console.log(ms);
        convertMs(ms) 
        timerDays.textContent = addLeadingZero(days); 
        timerHours.textContent = addLeadingZero(hours); 
        timerMinutes.textContent = addLeadingZero(minutes); 
        timerSeconds.textContent = addLeadingZero(seconds); 
            if (ms < 1000) {
                clearInterval(timerId);
                document.getElementById("datetime-picker").disabled = false;
            }
    }, 1000);
});
  