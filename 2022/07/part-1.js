import { loadDirectories } from './common.js';

export function part1({ lines }) {
  return loadDirectories(lines)
    .map((directory) => directory.calculateSize())
    .filter((size) => size <= 100000)
    .reduce((totalSize, size) => totalSize + size, 0);
}
