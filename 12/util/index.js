class Cave {
  constructor(key) {
    this.connections = [];
    this.key = key;
    this.isLarge = /[A-Z]/.test(key);
  }

  addConnection(connectedCave) {
    this.connections.push(connectedCave);
  }
}

export const getCavesMap = (data) => {
  const cavesByKey = new Map();

  cavesByKey.set("start", new Cave("start"));
  cavesByKey.set("end", new Cave("end"));

  data.forEach(([c1Key, c2Key]) => {
    const c1 = cavesByKey.get(c1Key) || new Cave(c1Key);
    const c2 = cavesByKey.get(c2Key) || new Cave(c2Key);

    if (!c1.connections.includes(c2)) {
      c1.addConnection(c2);
    }

    if (!c2.connections.includes(c1)) {
      c2.addConnection(c1);
    }

    cavesByKey.set(c1Key, c1);
    cavesByKey.set(c2Key, c2);
  });

  return cavesByKey;
};
