import { write } from '../utility.js';
import { loadDirectories } from './common.js';

const directories = loadDirectories();

write(
  7,
  1,
  directories
    .map((directory) => directory.calculateSize())
    .filter((size) => size <= 100000)
    .reduce((totalSize, size) => totalSize + size, 0)
    .toString()
);
