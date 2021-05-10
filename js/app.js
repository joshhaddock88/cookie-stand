'use strict'

let hours = [
  `6am: cookies`,
  `7am: cookies`,
  `8am: cookies`,
  `9am: cookies`,
  `10am: cookies`,
  `11am: cookies`,
  `12pm: cookies`,
  `1pm: cookies`,
  `2pm: cookies`,
  `3pm: cookies`,
  `4pm: cookies`,
  `5pm: cookies`,
  `6pm: cookies`,
  `7pm: cookies`,
  `Total: cookies`
];

function randomCookies(min, max, avg) {
  return Math.floor(avg * (Math.random() * (max - min)) + min);
}

const seattle = {
  min: 23,
  max: 65,
  avg: 6.3,
  hourlyCookies: [],
  setHourlyCookies: function() {
    for(let i = 0; i < hours.length - 1; i++) {
      this.hourlyCookies[i] = randomCookies(this.min, this.max, this.avg);
    }
  },
  totalCookies: null
}