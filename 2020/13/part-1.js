import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 13, 1];

const [timestampString, schedule] = read(YEAR, DAY, PART);

const buses = schedule
  .split(',')
  .filter((id) => id !== 'x')
  .map((id) => Number(id));

const timestamp = Number(timestampString);

const sorted = buses
  .map((id) => ({ id, wait: Math.ceil(timestamp / id) * id - timestamp }))
  .sort((a, b) => a.wait - b.wait);

const { id, wait } = sorted.shift();

write(YEAR, DAY, PART, id * wait);
