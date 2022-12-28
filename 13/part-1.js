import { read, write } from '../utility.js';

const [timestampString, schedule] = read(13);

const buses = schedule
  .split(',')
  .filter((id) => id !== 'x')
  .map((id) => Number(id));

const timestamp = Number(timestampString);

const sorted = buses
  .map((id) => ({ id, wait: Math.ceil(timestamp / id) * id - timestamp }))
  .sort((a, b) => a.wait - b.wait);

const { id, wait } = sorted.shift();

write(13, 1, id * wait);
