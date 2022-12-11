import { read, write } from '../utility.js';

const validCount = read(2).reduce((count, line) => {
  const [range, req, password] = line.split(' ');
  const [position1, position2] = range.split('-').map((n) => parseInt(n));
  const requirement = req.replace(':', '');
  const trackedChars = [password[position1 - 1], password[position2 - 1]];

  if (trackedChars.filter((c) => c === requirement).length === 1) return count + 1;
  return count;
}, 0);

write(2, 2, `${validCount}`);
