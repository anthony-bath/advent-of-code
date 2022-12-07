import fs from 'fs';
import { loadDirectories } from './common.js';

const directories = loadDirectories();

fs.writeFileSync(
  './07/output-1.txt',
  directories
    .map((directory) => directory.calculateSize())
    .filter((size) => size <= 100000)
    .reduce((totalSize, size) => totalSize + size, 0)
    .toString()
);
