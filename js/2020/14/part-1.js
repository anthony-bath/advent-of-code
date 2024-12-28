export function part1({ lines }) {
  const expr = /\d+/g;
  const mem = {};
  let mask;

  lines.forEach((line) => {
    if (line.startsWith('mask')) {
      const parts = line.split(' = ');
      mask = parts[1].split('');
    } else {
      const [address, value] = line.match(expr);
      mem[address] = applyMask(mask, value);
    }
  });

  return Object.values(mem).reduce((sum, value) => sum + value, 0);
}

function applyMask(mask, decimalValue) {
  const binary = Number(decimalValue).toString(2).padStart(36, '0').split('');
  const output = [];

  for (const [i, bit] of mask.entries()) {
    if (bit === 'X') output.push(binary[i]);
    else output.push(bit);
  }

  return parseInt(output.join(''), 2);
}
