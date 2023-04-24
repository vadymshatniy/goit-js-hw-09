const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

startButton.addEventListener('click', () => {
    timerId = setInterval(() => {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
        body.style.backgroundColor = color;
    }, 1000);
    startButton.setAttribute('disabled', true);
});

stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    startButton.removeAttribute('disabled');
});
