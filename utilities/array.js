export function permute(array) {
  let length = array.length,
    result = [array.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = array[i];
      array[i] = array[k];
      array[k] = p;
      ++c[i];
      i = 1;
      result.push(array.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }

  return result;
}

export function pairs(array) {
  return array.map((v, i) => array.slice(i + 1).map((w) => [v, w])).flat();
}
