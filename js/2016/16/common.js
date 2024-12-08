export function fillDisk(seedData, size) {
  let disk = [...seedData].map((n) => Number(n));

  while (disk.length < size) {
    const b = [...disk].reverse();

    for (let i = 0; i < b.length; i++) {
      if (b[i] === 0) {
        b[i] = 1;
      } else {
        b[i] = 0;
      }
    }

    disk = [...disk, 0, ...b];
  }

  return disk.slice(0, size);
}

export function checksum(data) {
  const result = [];

  for (let i = 0; i < data.length; i += 2) {
    if (data[i] === data[i + 1]) {
      result.push(1);
    } else {
      result.push(0);
    }
  }

  return result;
}
