export function shortestSum(targetWeight, weights) {
  if (targetWeight === 0) return [];
  if (targetWeight < 0) return null;

  let shortest = null;

  for (const [i, weight] of weights.entries()) {
    const remainingWeight = targetWeight - weight;
    const remainderCombo = shortestSum(remainingWeight, weights.slice(i + 1));

    if (remainderCombo !== null) {
      const combo = [weight, ...remainderCombo];

      if (!shortest || combo.length < shortest.length) {
        shortest = combo;
      }
    }
  }

  return shortest;
}
