import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 9, 1];

let [players, count] = read(YEAR, DAY, PART, { splitBy: null })
  .match(/\d+/g)
  .map((n) => Number(n));

class Marble {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

count *= 100;
const marbles = [];

for (let i = 0; i <= count; i++) {
  marbles.push(new Marble(i));
}

const scores = Array(players).fill(0);

const circle = marbles[0];
circle.next = circle;
circle.prev = circle;

let current = circle;
let marbleIndex = 1;
let playerIndex = 0;

while (true) {
  const marble = marbles[marbleIndex];

  if (marble.value % 23 === 0) {
    scores[playerIndex] += marble.value;

    let temp = current;

    for (let moves = 0; moves < 7; moves++) {
      temp = temp.prev;
    }

    scores[playerIndex] += temp.value;

    const removedPrev = temp.prev;
    const removedNext = temp.next;

    removedPrev.next = removedNext;
    removedNext.prev = removedPrev;

    current = removedNext;
  } else {
    let oldNext = current.next;

    marble.prev = oldNext;
    marble.next = oldNext.next;
    oldNext.next.prev = marble;
    oldNext.next = marble;

    current = marble;
  }

  marbleIndex++;
  playerIndex++;

  if (marbleIndex > count) {
    break;
  }

  if (playerIndex === players) {
    playerIndex = 0;
  }
}

write(YEAR, DAY, PART, Math.max(...scores));
