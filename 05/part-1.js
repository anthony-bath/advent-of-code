import { write } from '../utility.js';
import fs from 'fs';

write(
  5,
  1,
  Math.max(
    ...fs
      .readFileSync('./05/input.txt', 'utf-8')
      .replace(/[FL]/g, '0')
      .replace(/[BR]/g, '1')
      .split('\n')
      .map((line) => {
        const row = parseInt(line.substring(0, 7), 2);
        const col = parseInt(line.substring(7), 2);

        return row * 8 + col;
      })
  ).toString()
);
