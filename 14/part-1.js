import { read, write } from '../utility.js';

function applyMask(mask, decimalValue) {
  const binary = Number(decimalValue).toString(2).padStart(36, '0').split('');
  const output = [];

  for (const [i, bit] of mask.entries()) {
    if (bit === 'X') output.push(binary[i]);
    else output.push(bit);
  }

  return parseInt(output.join(''), 2);
}

const expr = /\d+/g;
const mem = {};
let mask;

read(14).forEach((line) => {
  if (line.startsWith('mask')) {
    const parts = line.split(' = ');
    mask = parts[1].split('');
  } else {
    const [address, value] = line.match(expr);
    mem[address] = applyMask(mask, value);
  }
});

write(14, 1, `${Object.values(mem).reduce((sum, value) => sum + value, 0)}`);
