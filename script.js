"use strict";

//BUG Countdown with hour value doesnt work, fix it later
/* const countToDate = new Date('June 25, 2022 18:00:00').setHours(new Date().getHours()) */

// 24 - 6 = 18:00:00 so (-6 for opening hour) and (+2 hours GMT difference) 
/* const countToDate = new Date('June 25, 2022 18:00:00').setUTCHours(new Date().getUTCHours() -5) */
const countToDate = new Date('June 25, 2022 17:00:00 GMT+1').getTime()
console.log(countToDate);
let previousTimeBetweenDates
setInterval(() => {
  const currentDate = new Date()
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
  if(timeBetweenDates < 0) {openModal()}
  flipAllCards(timeBetweenDates)

  previousTimeBetweenDates = timeBetweenDates
}, 250)

function flipAllCards(time) {
  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600) % 24
  const days = Math.floor(time / 86400)

  flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10))
  flip(document.querySelector("[data-days-ones]"), days % 10)
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10) )
  flip(document.querySelector("[data-hours-ones]"), hours % 10)
  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent)
  if(newNumber === startNumber) return

  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  top.textContent = startNumber;
  bottomHalf.textContent = startNumber;
  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
    
  });
  flipCard.append(topFlip, bottomFlip);
}

/* Modal Window */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

function openModal() {
  //console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}