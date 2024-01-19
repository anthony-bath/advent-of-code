const priorityMap = new Map();

for (let l = 97, u = 65; l < 123, u < 91; l++, u++) {
  priorityMap.set(String.fromCharCode(l), l - 96);
  priorityMap.set(String.fromCharCode(u), u - 38);
}

export { priorityMap };
