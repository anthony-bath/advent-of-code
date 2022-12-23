import { read, write } from '../utility.js';
import { Elf, NORTH_MOVES, SOUTH_MOVES, WEST_MOVES, EAST_MOVES, ALL_MOVES } from './common.js';

const elves = [];

read(23).forEach((line, y) => {
  line.split('').forEach((cell, x) => {
    if (cell === '.') return;
    elves.push(new Elf([x, y]));
  });
});

const occupiedPoints = new Set(elves.map((elf) => elf.location.toString()));
let proposalOrder = [NORTH_MOVES, SOUTH_MOVES, WEST_MOVES, EAST_MOVES];

const ROUNDS = 10;

for (let round = 0; round < ROUNDS; round++) {
  const proposals = new Map();
  const elvesWhoProposed = [];

  // PROPOSAL PHASE
  for (const elf of elves) {
    elf.propose(null);

    if (ALL_MOVES.every((check) => !occupiedPoints.has(elf.location.add(check).toString()))) {
      continue;
    }

    for (const moves of proposalOrder) {
      const possibleLocations = moves.map(([dx, dy]) => elf.location.add([dx, dy]));

      if (possibleLocations.some((location) => occupiedPoints.has(location.toString()))) {
        continue;
      }

      const proposal = possibleLocations[0];
      elf.propose(proposal);
      elvesWhoProposed.push(elf);

      const key = proposal.toString();
      if (!proposals.has(key)) {
        proposals.set(key, 1);
      } else {
        proposals.set(key, proposals.get(key) + 1);
      }

      break;
    }
  }

  // MOVE PHASE
  for (const elf of elvesWhoProposed) {
    if (proposals.get(elf.proposed.toString()) === 1) {
      occupiedPoints.delete(elf.location.toString());
      occupiedPoints.add(elf.proposed.toString());
      elf.moveToProposal();
    }
  }

  proposalOrder = [...proposalOrder.slice(1), proposalOrder[0]];
}

let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];

elves.forEach(({ location: { x, y } }) => {
  if (x < minX) minX = x;
  else if (x > maxX) maxX = x;

  if (y < minY) minY = y;
  else if (y > maxY) maxY = y;
});

write(23, 1, `${(1 + maxX - minX) * (1 + maxY - minY) - elves.length}`);
