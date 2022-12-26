import { read, write } from '../utility.js';

const lookup = { 2: 2, 1: 1, 0: 0, '-': -1, '=': -2 };

function snafuToDecimal(snafuString) {
  const places = snafuString.split('').reverse();

  return places.reduce((result, part, index) => {
    return result + lookup[part] * Math.pow(5, index);
  }, 0);
}

const reverseLookup = {
  2: 2,
  1: 1,
  0: 0,
  '-1': '-',
  '-2': '=',
};

function decimalToSNAFU(decimal) {
  let places = decimal
    .toString(5)
    .split('')
    .map((n) => Number(n));

  let index = places.findIndex((n) => n > 2);

  while (index !== -1) {
    places[index] -= 5;

    if (index > 0) {
      places[index - 1]++;
    } else {
      places = [1, ...places];
    }

    index = places.findIndex((n) => n > 2);
  }

  return places.map((place) => reverseLookup[place]).join('');
}

const decimal = read(25).reduce((sum, fuel) => sum + snafuToDecimal(fuel), 0);

write(25, 1, `${decimalToSNAFU(decimal)}`);
