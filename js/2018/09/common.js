export function getInputElements(data, factor = 1) {
  let [players, count] = data.match(/\d+/g).map(Number);
  count *= factor;

  const marbles = [];

  for (let i = 0; i <= count; i++) {
    marbles.push(new Marble(i));
  }

  const scores = Array(players).fill(0);

  return { players, count, marbles, scores };
}

class Marble {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
