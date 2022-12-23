import { read, write } from '../utility.js';

let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];

class Point {
  constructor([x, y]) {
    this.x = x;
    this.y = y;
  }

  add([x, y]) {
    return new Point([this.x + x, this.y + y]);
  }

  propose(proposed) {
    this.proposed = proposed;
  }

  moveToProposal() {
    this.x = this.proposed.x;
    this.y = this.proposed.y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

const elves = [];

read(23).forEach((line, y) => {
  line.split('').forEach((cell, x) => {
    if (cell === '.') return;

    elves.push(new Point([x, y]));

    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
  });
});

const occupiedPoints = new Set(elves.map((point) => point.toString()));

const NORTH_MOVES = [
  [0, -1], //N
  [-1, -1], //NW
  [1, -1], //NE
];

const SOUTH_MOVES = [
  [0, 1], //S
  [-1, 1], //SW
  [1, 1], //SE
];

const WEST_MOVES = [
  [-1, 0], //W
  [-1, -1], //NW
  [-1, 1], //SW
];

const EAST_MOVES = [
  [1, 0], //E
  [1, -1], //NE
  [1, 1], //SE
];

let proposalOrder = [NORTH_MOVES, SOUTH_MOVES, WEST_MOVES, EAST_MOVES];

const ROUNDS = 10;

for (let round = 0; round < ROUNDS; round++) {
  const proposals = new Map();
  const elvesWhoProposed = [];

  // PROPOSAL PHASE
  for (const elf of elves) {
    elf.propose(null);

    const allChecks = proposalOrder.reduce(
      (allMoves, moves) => [...allMoves, ...moves],
      []
    );

    if (
      allChecks.every((check) => !occupiedPoints.has(elf.add(check).toString()))
    ) {
      continue;
    }

    for (const moves of proposalOrder) {
      const checks = moves.map((move) => elf.add(move));

      if (checks.every((check) => !occupiedPoints.has(check.toString()))) {
        const proposal = checks[0];
        elf.propose(proposal);
        elvesWhoProposed.push(elf);

        if (!proposals.has(proposal.toString())) {
          proposals.set(proposal.toString(), 1);
        } else {
          proposals.set(
            proposal.toString(),
            proposals.get(proposal.toString()) + 1
          );
        }

        // console.log(
        //   `Elf at ${elf.toString()} proposed ${elf.proposed.toString()}`
        // );

        break;
      }
    }
  }

  // MOVE PHASE
  for (const elf of elvesWhoProposed) {
    if (proposals.get(elf.proposed.toString()) === 1) {
      occupiedPoints.delete(elf.toString());
      elf.moveToProposal();

      if (elf.x < minX) minX = elf.x;
      if (elf.x > maxX) maxX = elf.x;
      if (elf.y < minY) minY = elf.y;
      if (elf.y > maxY) maxY = elf.y;

      occupiedPoints.add(elf.toString());
    }
  }

  print(round);

  proposalOrder = [...proposalOrder.slice(1), proposalOrder[0]];
}

function print(round) {
  const output = [];
  for (let y = minY; y <= maxY; y++) {
    const line = [];
    for (let x = minX; x <= maxX; x++) {
      if (!occupiedPoints.has(`${x},${y}`)) {
        line.push('.');
      } else {
        line.push('#');
      }
    }

    output.push(line.join(''));
  }

  console.log(`\nAFTER ROUND ${round + 1}`);
  console.log(output.join('\n'));
  console.log('');
}

write(23, 1, `${(1 + maxX - minX) * (1 + maxY - minY) - elves.length}`);
