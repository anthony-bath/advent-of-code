import { sum } from '../../utilities/array.js';

export function part1({ data }) {
  const input = data.split(' ').map(Number);
  const metadata = [];

  function setMetadata(data) {
    const [children, metadataCount] = data.splice(0, 2);

    if (children > 0) {
      for (let i = 0; i < children; i++) {
        setMetadata(data);
      }
    }

    metadata.push(...data.splice(0, metadataCount));
  }

  setMetadata(input);

  return sum(metadata);
}
