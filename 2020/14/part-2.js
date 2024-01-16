export function part2({ lines }) {
  const expr = /\d+/g;
  const mem = {};
  let mask;

  lines.forEach((line) => {
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

  return Object.values(mem).reduce((sum, value) => sum + value, 0);
}

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

  const baseAddress = output.join('');

  const floatingBitCombinations = [...Array(Math.pow(2, floatingBits)).keys()].map((_, i) =>
    i.toString(2).padStart(floatingBits, '0').split('')
  );

  const addresses = floatingBitCombinations.map((combination) => {
    let comboIndex = 0;
    const address = baseAddress.replace(/X/g, () => combination[comboIndex++]);

    return parseInt(address, 2);
  });

  return addresses;
}
