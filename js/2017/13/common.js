export function getInputElements(lines) {
  const layers = new Map();
  let MAX_LAYER = -Infinity;

  lines.forEach((line) => {
    const [layer, depth] = line.split(': ').map((n) => Number(n));
    layers.set(layer, depth);

    if (layer > MAX_LAYER) {
      MAX_LAYER = layer;
    }
  });

  return { layers, MAX_LAYER };
}
