import { read, write } from '../utility.js';

function getAddresses(mask, address) {
  const binary = Number(address).toString(2).padStart(36, '0').split('');
  const output = [];
  let floatingBits = 0;

  for (const [i, bit] of mask.entries()) {
    switch (bit) {
      case 'X':
        output.push(bit);
        floatingBits++;
        break;
      case '1':
        output.push(bit);
        break;
      case '0':
        output.push(binary[i]);
    }
  }

  const floatingBitCombinations = [...Array(Math.pow(2, floatingBits)).keys()].map((_, i) =>
    i.toString(2).padStart(floatingBits, '0').split('')
  );

  const addresses = floatingBitCombinations.map((combination) => {
    let comboIndex = 0;
    const address = [...output];

    for (let i = 0; i < address.length; i++) {
      if (address[i] === 'X') {
        address[i] = combination[comboIndex++];
      }
    }

    return parseInt(address.join(''), 2);
  });

  return addresses;
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
    const addresses = getAddresses(mask, address);

    for (const address of addresses) {
      mem[address] = Number(value);
    }
  }
});

write(
  14,
  2,
  Object.values(mem).reduce((sum, value) => sum + value, 0)
);
