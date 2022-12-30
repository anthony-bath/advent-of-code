import { write } from '../utility.js';
import fs from 'fs';

const seatIds = fs
  .readFileSync('./05/input.txt', 'utf-8')
  .replace(/[FL]/g, '0')
  .replace(/[BR]/g, '1')
  .split('\n')
  .map((line) => {
    const row = parseInt(line.substring(0, 7), 2);
    const col = parseInt(line.substring(7), 2);

    return row * 8 + col;
  })
  .sort((a, b) => a - b);

write(5, 2, 1 + seatIds.find((id, index) => seatIds[index + 1] !== id + 1));
