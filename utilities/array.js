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

export function getCombinations(array) {
  const combos = [];
  const count = Math.pow(2, array.length);

  for (let i = 0; i < count; i++) {
    const temp = [];

    for (let j = 0; j < array.length; j++) {
      if (i & Math.pow(2, j)) {
        temp.push(array[j]);
      }
    }

    if (temp.length > 0) {
      combos.push(temp);
    }
  }

  return combos;
}

export function sum(array) {
  return array.reduce((total, current) => total + current, 0);
}
