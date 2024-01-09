import { checksum, fillDisk } from './common.js';

export function part2({ data }) {
  const SIZE = 35651584;

  let diskData = fillDisk(data, SIZE);

  while (diskData.length % 2 === 0) {
    diskData = checksum(diskData);
  }

  return diskData.join('');
}
