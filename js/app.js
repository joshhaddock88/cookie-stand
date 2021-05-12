'use strict'

const sales = document.getElementById('sales');

let hours = [
  `6:00am`,
  `7:00am`,
  `8:00am`,
  `9:00am`,
  `10:00am`,
  `11:00am`,
  `12:00pm`,
  `1:00pm`,
  `2:00pm`,
  `3:00pm`,
  `4:00pm`,
  `5:00pm`,
  `6:00pm`,
  `7:00pm`,
  `Daily Location Total`
];

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

function Store(name, min, max, avg, hourlyCookies) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.hourlyCookies = hourlyCookies;
}

Store.prototype.setHourlyCookies = function() {
  let total = 0; // daily total for this store
  for (let i = 0; i < hours.length - 1; i++) {
    this.hourlyCookies[i] = generateHourlyCookies(this.min, this.max, this.avg);
    total += this.hourlyCookies[i];
  }
  this.hourlyCookies[hours.length - 1] = total;
  return this.hourlyCookies;
}


let seattleStore = new Store ('Seattle', 23, 65, 6.3, []);
seattleStore.setHourlyCookies();

let tokyoStore = new Store ('Tokyo', 3, 24, 1.2, []);
tokyoStore.setHourlyCookies();

let dubaiStore = new Store ('Dubai', 11, 38, 3.7, []);
dubaiStore.setHourlyCookies();

let parisStore = new Store ('Paris', 20, 38, 2.3, []);
parisStore.setHourlyCookies();

let limaStore = new Store ('Lima', 2, 16, 4.6, []);
limaStore.setHourlyCookies();


// function makeCitySalesList(store) {
//   let name = store.name;
//   const articleElem = document.createElement('article');
//   articleElem.setAttribute('id', name);
//   sales.appendChild(articleElem);

//   const ulElem = document.createElement('ul');
//   articleElem.appendChild(ulElem);

//   const h2Elem = document.createElement('h2');
//   ulElem.appendChild(h2Elem);
//   h2Elem.textContent = store.name;

//   for (let i = 0; i < hours.length; i++) {
//     const liElem = document.createElement('li');
//     liElem.textContent = `${hours[i]} ${store.hourlyCookies[i]}`;
//     ulElem.appendChild(liElem);
//   }
// }

let storesArray = [
  seattleStore,
  tokyoStore,
  dubaiStore,
  parisStore,
  limaStore,
]

// function printAllCitiesToScreen() {
//   for(let i = 0; i < storesArray.length; i++) {
//     makeCitySalesList(storesArray[i]);
//   }
// }
// printAllCitiesToScreen();

let hourlyTotals = []

function gethourlyTotals() { //gets hourly total across stores.
  for (let i = 0; i < hours.length -1; i++) {
    let totalHourly = 0;
    for (let j = 0; j < storesArray.length; j++) {
      totalHourly += storesArray[j].hourlyCookies[i];
    }
    hourlyTotals[i] = totalHourly;
    console.log(`${hours[i]} total is ${hourlyTotals[i]}`)
  }
}
gethourlyTotals();

const tableElem = document.createElement('table');
sales.appendChild(tableElem);

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
makeHeader();

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
function printGrid() {
  for (let i = 0; i < storesArray.length; i++) {
    storesArray[i].createGridRow();
  }
}
printGrid();

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
      console.log(`Total sales are ${total}`)
    }
    trElem.appendChild(thElem);
  }
  const thElem = document.createElement('th');
  trElem.appendChild(thElem);
  thElem.textContent = total;
}
makeFooter();