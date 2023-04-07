import { sum } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';
import { CookieTrait } from './common.js';

const [YEAR, DAY, PART] = [2015, 15, 1];

const traits = [];

read(YEAR, DAY, PART).forEach((line) => {
  const factors = line.match(/-?\d+/g).map((n) => Number(n));

  if (traits.length === 0) {
    for (const factor of factors) {
      traits.push(new CookieTrait(factor));
    }
  } else {
    for (let i = 0; i < traits.length; i++) {
      traits[i].addFactor(factors[i]);
    }
  }
});

const INGREDIENT_COUNT = traits[0].factors.length;
const AVAILABLE_TSP = 100;

function evaluate(quantities = []) {
  let best = 0;
  const currentSum = sum(quantities);

  if (quantities.length === INGREDIENT_COUNT - 1) {
    const finalQuantities = [...quantities, AVAILABLE_TSP - currentSum];
    const totals = traits.map((trait) => trait.total(finalQuantities));

    if (totals.some((total) => total <= 0)) return 0;

    return totals.slice(0, totals.length - 1).reduce((product, total) => product * total, 1);
  } else {
    for (let i = 0; i <= AVAILABLE_TSP - currentSum; i++) {
      best = Math.max(best, evaluate([...quantities, i]));
    }

    return best;
  }
}

write(YEAR, DAY, PART, evaluate());
