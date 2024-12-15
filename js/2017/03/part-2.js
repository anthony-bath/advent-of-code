export function part2({ data }) {
  const targetValue = Number(data);

  const coords = new Map();

  function getValue(x, y) {
    const deltas = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
    ];

    return deltas.reduce((sum, [dx, dy]) => sum + (coords.get(`${x + dx}|${y + dy}`) ?? 0), 0);
  }

  let x = 0;
  let y = 0;
  let layer = 0;
  let upMoves = 0;
  let leftMoves = 0;
  let downMoves = 0;
  let rightMoves = 0;
  let maxValue = -Infinity;

  coords.set('0|0', 1);

  let currentSquare = 2;

  while (true) {
    let sideLength = Math.ceil(Math.sqrt(currentSquare++));

    if (sideLength % 2 === 0) {
      sideLength++;
    }

    const thisLayer = Math.floor(sideLength / 2);

    if (thisLayer !== layer) {
      // have moved to a new layer so need to move right
      layer = thisLayer;
      x++;

      // move counters reset
      upMoves = sideLength - 2;
      leftMoves = sideLength - 1;
      downMoves = sideLength - 1;
      rightMoves = sideLength - 1;
    } else if (upMoves > 0) {
      y++;
      upMoves--;
    } else if (leftMoves > 0) {
      x--;
      leftMoves--;
    } else if (downMoves > 0) {
      y--;
      downMoves--;
    } else if (rightMoves > 0) {
      x++;
    }

    const newValue = getValue(x, y);
    coords.set(`${x}|${y}`, newValue);

    if (newValue > maxValue) {
      maxValue = newValue;
      if (maxValue > targetValue) {
        break;
      }
    }
  }

  return maxValue;
}
