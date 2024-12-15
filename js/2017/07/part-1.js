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

export function part1({ lines }) {
  const programs = new Map();

  lines.forEach((line) => {
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

  return [...programs.values()].filter((program) => program.parent === null).pop().name;
}
