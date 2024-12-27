export function getReactions(lines) {
  const reactions = new Map();

  lines.forEach((line) => {
    const [inputs, output] = line.split(' => ');
    const [quantity, element] = output.split(' ');

    const input = inputs.split(', ').map((part) => {
      const [quantity, element] = part.split(' ');
      return { element, quantity: Number(quantity) };
    });

    reactions.set(element, { output: Number(quantity), input });
  });

  return reactions;
}
