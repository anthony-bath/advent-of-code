export function part2({ data }) {
  const input = data.split(',').map(Number);
  const TURNS = 30000000;

  let turn = 1;
  const spoken = new Array(TURNS);

  for (const number of input.slice(0, input.length - 1)) {
    spoken[number] = turn++;
  }

  turn = input.length;
  let spokenNumber = input[input.length - 1];

  while (turn < TURNS) {
    if (spokenNumber in spoken) {
      const previousOccurence = spoken[spokenNumber];
      spoken[spokenNumber] = turn;
      spokenNumber = turn - previousOccurence;
    } else {
      spoken[spokenNumber] = turn;
      spokenNumber = 0;
    }

    turn++;
  }

  return spokenNumber;
}
