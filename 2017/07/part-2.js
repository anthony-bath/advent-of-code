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

  totalWeight() {
    return (
      this.weight +
      Object.values(this.children).reduce((sum, child) => sum + child.totalWeight(), 0)
    );
  }
}

function evaluate(node) {
  const weightByChild = Object.values(node.children).reduce(
    (output, child) => ({ ...output, [child.name]: child.totalWeight() }),
    {}
  );

  const childrenCount = Object.keys(weightByChild).length;

  const mismatch = Object.entries(weightByChild).find(([name, weight]) => {
    let unequalCount = 0;

    const otherChildren = Object.values(node.children).filter((c) => c.name !== name);

    for (const child of otherChildren) {
      if (child.totalWeight() !== weight) {
        unequalCount++;
      }
    }

    return unequalCount === childrenCount - 1;
  });

  return mismatch;
}

function getDiff(weights) {
  const weightMap = {};

  for (const weight of weights) {
    if (!(weight in weightMap)) {
      weightMap[weight] = 1;
    } else {
      weightMap[weight]++;
    }
  }

  const soloWeight = Number(Object.keys(weightMap).find((w) => weightMap[w] === 1));
  delete weightMap[soloWeight];

  const commonWeight = Number(Object.keys(weightMap).shift());

  return commonWeight - soloWeight;
}

export function part2({ lines }) {
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

  let node = [...programs.values()].filter((program) => program.parent === null).pop();
  let weight = null;

  while (true) {
    const result = evaluate(node);

    if (result) {
      node = programs.get(result[0]);
    } else {
      const offset = getDiff(
        Object.values(node.parent.children).map((child) => child.totalWeight())
      );
      weight = node.weight + offset;
      break;
    }
  }

  return weight;
}
