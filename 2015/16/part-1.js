import { readOld, write } from '../../utilities/io.js';
import { Sue, targetSue } from './common.js';

const [YEAR, DAY, PART] = [2015, 16, 1];

const sues = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  const [idPart, ...traitList] = line.match(/(\w+\s\d+:|\w+:\s\d+)/g);
  const id = Number(idPart.match(/\d+/));
  const traits = new Map();

  traitList.forEach((entry) => {
    const [trait, value] = entry.split(': ');
    traits.set(trait, Number(value));
  });

  sues.push(new Sue(id, traits));
});

write(YEAR, DAY, PART, sues.find((sue) => sue.equals1(targetSue)).id);
