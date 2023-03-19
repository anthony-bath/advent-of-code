export function sparseHash(list, lengths, rounds = 1) {
  const SIZE = list.length;
  let position = 0;
  let skipSize = 0;

  for (let round = 0; round < rounds; round++) {
    for (const length of lengths) {
      let newList;

      if (position + length >= list.length) {
        const remainder = position + length - list.length;
        const sublist = [...list.splice(position), ...list.splice(0, remainder)];

        sublist.reverse();

        newList = [...sublist.splice(sublist.length - remainder), ...list, ...sublist];
      } else {
        const front = list.slice(0, position);
        const sublist = list.slice(position, position + length);
        const back = list.slice(position + length);

        sublist.reverse();

        newList = [...front, ...sublist, ...back];
      }

      list = newList;
      position = (position + length + skipSize) % SIZE;
      skipSize++;
    }
  }

  return list;
}
