import { checksum, fillDisk } from './common.js';

export function part1({ data }) {
  const SIZE = 272;

  let diskData = fillDisk(data, SIZE);

  while (diskData.length % 2 === 0) {
    diskData = checksum(diskData);
  }

  return diskData.join('');
}
