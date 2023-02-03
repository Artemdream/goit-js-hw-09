import Notiflix from 'notiflix'; 

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault()

  const delay = Number(this.delay.value);
  const stepDelay = Number(this.step.value);
  const amount = Number(this.amount.value);
  let position = 0;
  let diffDelay = delay - stepDelay;

  const promiseId = setInterval(() => {
    position += 1;
    diffDelay += stepDelay;

    console.log(diffDelay);
    console.log(`'delay :' ${delay}`);
    createPromise(position, diffDelay).then(onResolve).catch(onReject);
    if (amount <= position) clearInterval(promiseId);
  }, stepDelay);

  
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      else reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay)
  })
}

function onResolve(value) {
  Notiflix.Notify.success(value);
}

function onReject(error) {
  Notiflix.Notify.failure(error);
} 