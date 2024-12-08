export class Sue {
  constructor(id, traits) {
    this.id = id;
    this.traits = traits;
  }

  hasTrait(trait) {
    return this.traits.has(trait);
  }

  getTrait(trait) {
    return this.traits.get(trait);
  }

  equals1(otherSue) {
    for (const [trait, value] of this.traits) {
      if (otherSue.hasTrait(trait)) {
        if (otherSue.getTrait(trait) !== value) {
          return false;
        }
      }
    }

    return true;
  }

  equals2(otherSue) {
    for (const [trait, value] of this.traits) {
      if (otherSue.hasTrait(trait)) {
        switch (trait) {
          case 'cats':
          case 'trees':
            if (otherSue.getTrait(trait) >= value) {
              return false;
            }
            break;

          case 'pomeranians':
          case 'goldfish':
            if (otherSue.getTrait(trait) <= value) {
              return false;
            }
            break;

          default:
            if (otherSue.getTrait(trait) !== value) {
              return false;
            }
        }
      }
    }

    return true;
  }
}

export const targetSue = new Sue(
  -1,
  new Map([
    ['children', 3],
    ['cats', 7],
    ['samoyeds', 2],
    ['pomeranians', 3],
    ['akitas', 0],
    ['vizslas', 0],
    ['goldfish', 5],
    ['trees', 3],
    ['cars', 2],
    ['perfumes', 1],
  ])
);
