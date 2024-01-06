import { Sue, targetSue } from './common.js';

export function part1({ lines }) {
  const sues = [];

  lines.forEach((line) => {
    const [idPart, ...traitList] = line.match(/(\w+\s\d+:|\w+:\s\d+)/g);
    const id = Number(idPart.match(/\d+/));
    const traits = new Map();

    traitList.forEach((entry) => {
      const [trait, value] = entry.split(': ');
      traits.set(trait, Number(value));
    });

    sues.push(new Sue(id, traits));
  });

  return sues.find((sue) => sue.equals1(targetSue)).id;
}
