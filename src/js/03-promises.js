
const form = document.querySelector(".form");
const firstDelayField = document.querySelector('input[name="delay"]');
const stepField = document.querySelector('input[name="step"]');
const amountField = document.querySelector('input[name="amount"]');
const button = document.querySelector("button");

let position = 0;

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay }); // Fulfill
      } else {
        rej({ position, delay })  // Reject
      }
    }, delay);
  });
};

function onFormSubmit(event) {
  event.preventDefault();
  position = position + 1;
  const firstDelay = Number(firstDelayField.value);
  const step = Number(stepField.value);
  const amount = Number(amountField.value);
  if (firstDelay < 0 || step < 0 || amount < 0) {
    alert("Please set only positive values!")
  } else {
    let delay = firstDelay;
    for (let i = 0; i < amount; i++) {
      createPromise(position + i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
    }
  }
};

form.addEventListener('submit', onFormSubmit);