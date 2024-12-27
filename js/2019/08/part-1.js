export function part1({ data }) {
  const WIDTH = 25;
  const HEIGHT = 6;

  const layers = {};

  data.split('').forEach((pixel, i) => {
    const layer = Math.floor(i / (WIDTH * HEIGHT));

    if (!layers[layer]) {
      layers[layer] = [0, 0, 0];
    }

    layers[layer][Number(pixel)]++;
  });

  const [_, ones, twos] = Object.values(layers)
    .sort((a, b) => a[0] - b[0])
    .shift();

  return ones * twos;
}
