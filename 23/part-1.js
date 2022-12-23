import { read, write } from '../utility.js';
import { Elf, NORTH_MOVES, SOUTH_MOVES, WEST_MOVES, EAST_MOVES } from './common.js';

let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
const elves = [];

read(23).forEach((line, y) => {
  line.split('').forEach((cell, x) => {
    if (cell === '.') return;

    elves.push(new Elf([x, y]));

    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
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

    let adjacentOccupiedCount = 0;

    for (const moves of proposalOrder) {
      const possibleLocations = moves.map((move) => elf.location.add(move));
      const occupied = possibleLocations.reduce(
        (count, location) => (count + occupiedPoints.has(location.toString()) ? 1 : 0),
        0
      );

      if (!elf.proposed && occupied === 0) {
        const proposal = possibleLocations[0];
        elf.propose(proposal);
        elvesWhoProposed.push(elf);

        const key = proposal.toString();
        if (!proposals.has(key)) {
          proposals.set(key, 1);
        } else {
          proposals.set(key, proposals.get(key) + 1);
        }
      }

      adjacentOccupiedCount += occupied;
    }

    if (adjacentOccupiedCount === 0) {
      const key = elf.proposed.toString();
      proposals.set(key, proposals.get(key) - 1);
      elf.propose(null);
      elvesWhoProposed.pop();
    }
  }

  // MOVE PHASE
  for (const elf of elvesWhoProposed) {
    if (proposals.get(elf.proposed.toString()) === 1) {
      occupiedPoints.delete(elf.location.toString());
      occupiedPoints.add(elf.proposed.toString());
      elf.moveToProposal();

      const { x, y } = elf.location;

      if (x < minX) minX = x;
      else if (x > maxX) maxX = x;

      if (y < minY) minY = y;
      else if (y > maxY) maxY = y;
    }
  }

  proposalOrder = [...proposalOrder.slice(1), proposalOrder[0]];
}

write(23, 1, `${(1 + maxX - minX) * (1 + maxY - minY) - elves.length}`);
