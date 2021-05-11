'use strict'

let hours = [
  `6am:`,
  `7am:`,
  `8am:`,
  `9am:`,
  `10am:`,
  `11am:`,
  `12pm:`,
  `1pm:`,
  `2pm:`,
  `3pm:`,
  `4pm:`,
  `5pm:`,
  `6pm:`,
  `7pm:`,
  `Total:`
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

const seattle = {
  name: 'Seattle',
  min: 23,
  max: 65,
  avg: 6.3,
  hourlyCookies: []
}

const tokyo = {
  name: 'Tokyo',
  min: 3,
  max: 24,
  avg: 1.2,
  hourlyCookies: []
}

const dubai = {
  name: 'Dubai',
  min: 11,
  max: 38,
  avg: 3.7,
  hourlyCookies: []
}

const paris = {
  name: 'Paris',
  min: 20,
  max: 38,
  avg: 2.3,
  hourlyCookies: []
}

const lima = {
  name: 'Lima',
  min: 2,
  max: 16,
  avg: 4.6,
  hourlyCookies: []
}

function allCityHourlyCookies () {
  getHourlyCookiesArray(seattle);
  getHourlyCookiesArray(tokyo);
  getHourlyCookiesArray(dubai);
  getHourlyCookiesArray(paris);
  getHourlyCookiesArray(lima);
}

allCityHourlyCookies();

const sales = document.getElementById('sales');

function makeCitySalesList(city) {
  const articleElem = document.createElement('section');
  sales.appendChild(articleElem);

  const ulElem = document.createElement('ul');
  articleElem.appendChild(ulElem);

  const h2Elem = document.createElement('h2');
  ulElem.appendChild(h2Elem);
  h2Elem.textContent = city.name;

  for (let i = 0; i < hours.length; i++) {
    const liElem = document.createElement('li');
    liElem.textContent = `${hours[i]} ${city.hourlyCookies[i]}`;
    ulElem.appendChild(liElem);
  }
}

function printAllCitiesToScreen() {
  makeCitySalesList(seattle);
  makeCitySalesList(tokyo);
  makeCitySalesList(dubai);
  makeCitySalesList(paris);
  makeCitySalesList(lima);
}
printAllCitiesToScreen();