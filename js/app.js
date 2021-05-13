'use strict'
// --------------------------------------------- Global Variables -------------------------------------------------------//
const sales = document.getElementById('sales');
const formElem = document.getElementById('addStore')

let hours = [`6:00am`, `7:00am`, `8:00am`, `9:00am`, `10:00am`, `11:00am`, `12:00pm`, `1:00pm`, `2:00pm`, `3:00pm`, `4:00pm`, `5:00pm`, `6:00pm`, `7:00pm`, `Daily Location Total`];

let storesArray = [];

let hourlyTotals = [];


// --------------------------------------------- Constructor Functions -------------------------------------------------------//

function Store(name, min, max, avg, hourlyCookies) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.hourlyCookies = hourlyCookies;

  storesArray.push(this);
}

// --------------------------------------------- Prototype Methods -------------------------------------------------------//

Store.prototype.setHourlyCookies = function() {
  let total = 0; // daily total for this store
  for (let i = 0; i < hours.length - 1; i++) {
    this.hourlyCookies[i] = generateHourlyCookies(this.min, this.max, this.avg);
    total += this.hourlyCookies[i];
  }
  this.hourlyCookies[hours.length - 1] = total;
  return this.hourlyCookies;
}

Store.prototype.createGridRow = function () {
  const trElem = document.createElement('tr');
  sales.appendChild(trElem);
  const thElem = document.createElement('th');
  trElem.appendChild(thElem);
  thElem.textContent = `${this.name}`;
  for (let i = 0; i < hours.length; i++) {
    const tdElem = document.createElement('td');
    trElem.appendChild(tdElem);
    tdElem.textContent = `${this.hourlyCookies[i]}`;
  }
}

// --------------------------------------------- Regular Functions -------------------------------------------------------//

function generateHourlyCookies(min, max, avg) {
  return Math.floor(avg * (Math.random() * (max - min)) + min);
}

function getHourlyCookiesArray(city) {
  let total = 0;
  for (let i = 0; i < hours.length - 1; i++) {
    city.hourlyCookies[i] = generateHourlyCookies(city.min, city.max, city.avg);
    total += city.hourlyCookies[i];
  }
  city.hourlyCookies[hours.length - 1] = total;
  return city.hourlyCookies;
}

function setAllHourlyCookies (stores) {
  for (let i = 0; i < storesArray.length; i++) {
    stores[i].setHourlyCookies();
  }
}

function gethourlyTotals() { //gets hourly total across stores.
  for (let i = 0; i < hours.length -1; i++) {
    let totalHourly = 0;
    for (let j = 0; j < storesArray.length; j++) {
      totalHourly += storesArray[j].hourlyCookies[i];
    }
    hourlyTotals[i] = totalHourly;
  }
}

// const tableElem = document.createElement('table');  I think this doesn't do anything
// sales.appendChild(tableElem);

function makeHeader () {

  const trElem = document.createElement('tr');
  sales.appendChild(trElem);

  for (let i = 0; i <= hours.length; i++) {
    const thElem = document.createElement('th');
    if (i > 0) {
      thElem.textContent = `${hours[i - 1]}`;
    }
    trElem.appendChild(thElem);
  }
}


function makeStoreRows() {
  for (let i = 0; i < storesArray.length; i++) {
    storesArray[i].createGridRow();
  }
}

function makeFooter () {

  const trElem = document.createElement('tr');
  sales.appendChild(trElem);
  let total = 0;
  for (let i = 0; i < hours.length; i++) {
    const thElem = document.createElement('th');
    trElem.appendChild(thElem);
    thElem.textContent = `Totals`;
    if (i > 0) {
      thElem.textContent = `${hourlyTotals[i - 1]}`;
      total += hourlyTotals[i - 1];
    }
    trElem.appendChild(thElem);
  }
  const thElem = document.createElement('th');
  trElem.appendChild(thElem);
  thElem.textContent = total;
}

function printGrid () {
  makeHeader();
  makeStoreRows();
  gethourlyTotals();
  makeFooter();
}

function handleSubmit(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let min = Number(event.target.min.value);
  let max = Number(event.target.max.value);
  let avg = Number(event.target.avg.value);

  let newStore = new Store(name, min, max, avg, []);
  console.log(newStore.min);
  setAllHourlyCookies(storesArray);
  printGrid();
}

// --------------------------------------------- Event Listeners -------------------------------------------------------//

formElem.addEventListener('submit', handleSubmit);

// --------------------------------------------- Functions Calls -------------------------------------------------------//

const seattleStore = new Store('Seattle', 23, 65, 6.3, []);

const tokyoStore = new Store('Tokyo', 3, 24, 1.2, []);

const dubaiStore = new Store('Dubai', 11, 38, 3.7, []);

const parisStore = new Store('Dubai', 11, 38, 2.3, []);

const limaStore = new Store('Lima', 2, 16, 4.6, []);

setAllHourlyCookies(storesArray);

printGrid();