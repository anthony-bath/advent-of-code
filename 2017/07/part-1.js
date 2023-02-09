import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 7, 1];

class Program {
  constructor(name, weight, childNames) {
    this.name = name;
    this.weight = Number(weight);
    this.children = {};
    this.parent = null;
    this.childNames = childNames ?? [];
  }

  addChild(child) {
    child.parent = this;
    this.children[child.name] = child;
  }
}

const programs = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [program, children] = line.split(' -> ');
  const [name] = program.split(' ');
  const weight = program.match(/\d+/g)[0];

  programs.set(name, new Program(name, weight, children && children.split(', ')));
});

for (const program of programs.values()) {
  program.childNames.forEach((childName) => {
    program.addChild(programs.get(childName));
  });
}

const result = [...programs.values()].filter((program) => program.parent === null).pop().name;

write(YEAR, DAY, PART, result);
