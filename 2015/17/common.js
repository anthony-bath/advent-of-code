export function fill(volume, containers) {
  const combinations = [];

  for (const [i, container] of containers.entries()) {
    const remainingVolume = volume - container;

    if (remainingVolume === 0) {
      combinations.push([container]);
    } else if (remainingVolume > 0) {
      const ways = fill(remainingVolume, containers.slice(i + 1));

      for (const way of ways) {
        combinations.push([container, ...way]);
      }
    }
  }

  return combinations;
}
