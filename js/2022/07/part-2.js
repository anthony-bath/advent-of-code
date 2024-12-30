import { loadDirectories } from './common.js';

export function part2({ lines }) {
  const FILE_SYSTEM_SIZE = 70000000;
  const FREE_SPACE_REQUIRED = 30000000;

  const directories = loadDirectories(lines);
  const availableSpace = FILE_SYSTEM_SIZE - directories[0].calculateSize();
  const sizeToDelete = FREE_SPACE_REQUIRED - availableSpace;

  return Math.min(
    ...directories
      .map((directory) => directory.calculateSize())
      .filter((size) => size >= sizeToDelete)
  );
}
