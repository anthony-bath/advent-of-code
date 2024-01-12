import { getInputElements } from './common.js';

export function part2({ data }) {
  const { players, count, marbles, scores } = getInputElements(data, 100);
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

  return Math.max(...scores);
}
