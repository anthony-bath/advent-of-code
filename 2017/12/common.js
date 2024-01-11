export function getPrograms(lines) {
  class Program {
    constructor(id, childrenIds) {
      this.id = id;
      this.childrenIds = childrenIds;
    }
  }

  const programs = new Map();

  lines.forEach((line) => {
    const [id, childrenIdsRaw] = line.split(' <-> ');
    const childrenIds = childrenIdsRaw.split(', ').map((n) => Number(n));

    programs.set(Number(id), new Program(Number(id), childrenIds));
  });

  return programs;
}
