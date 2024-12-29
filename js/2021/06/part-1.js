export function part1({ data }) {
  const fish = data.split(',').map(Number);
  const DAYS = 80;

  for (let day = 0; day < DAYS; day++) {
    let fishCount = fish.length;

    for (let i = 0; i < fishCount; i++) {
      fish[i]--;

      if (fish[i] === -1) {
        fish[i] = 6;
        fish.push(8);
      }
    }
  }

  return fish.length;
}
