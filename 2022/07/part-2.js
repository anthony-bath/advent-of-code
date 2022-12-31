import { write } from '../../utility.js';
import { loadDirectories } from './common.js';

const [YEAR, DAY, PART] = [2022, 7, 2];

const FILE_SYSTEM_SIZE = 70000000;
const FREE_SPACE_REQUIRED = 30000000;

const directories = loadDirectories();
const availableSpace = FILE_SYSTEM_SIZE - directories[0].calculateSize();
const sizeToDelete = FREE_SPACE_REQUIRED - availableSpace;

write(
  YEAR,
  DAY,
  PART,
  Math.min(
    ...directories
      .map((directory) => directory.calculateSize())
      .filter((size) => size >= sizeToDelete)
  )
);
