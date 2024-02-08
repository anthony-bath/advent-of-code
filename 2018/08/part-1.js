export function part1({ data }) {
  const input = data.split(' ').map(Number).reverse();

  function setMetadata(children, metadataCount) {
    let sum = 0;

    for (let i = 0; i < children; i++) {
      sum += setMetadata(input.pop(), input.pop());
    }

    for (let i = 0; i < metadataCount; i++) {
      sum += input.pop();
    }

    return sum;
  }

  return setMetadata(input.pop(), input.pop());
}
