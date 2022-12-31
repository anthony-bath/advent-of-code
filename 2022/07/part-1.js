import { write } from '../../utility.js';
import { loadDirectories } from './common.js';

const [YEAR, DAY, PART] = [2022, 7, 1];

const directories = loadDirectories();

write(
  YEAR,
  DAY,
  PART,
  directories
    .map((directory) => directory.calculateSize())
    .filter((size) => size <= 100000)
    .reduce((totalSize, size) => totalSize + size, 0)
);
