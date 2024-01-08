export function getData(lines) {
  const expr = /(\w+ generator|\w+-compatible microchip)/g;
  const data = [];
  const valueByMaterial = new Map();

  lines.forEach((floor) => {
    const items = floor.match(expr) || [];

    let generators = 0;
    let microchips = 0;

    for (const item of items) {
      if (item.includes('generator')) {
        const material = item.split(' ')[0];

        if (!valueByMaterial.has(material)) {
          valueByMaterial.set(material, Math.pow(2, valueByMaterial.size));
        }

        generators |= valueByMaterial.get(material);
      } else {
        const material = item.split('-')[0];

        if (!valueByMaterial.has(material)) {
          valueByMaterial.set(material, Math.pow(2, valueByMaterial.size));
        }

        microchips |= valueByMaterial.get(material);
      }
    }

    data.push([generators, microchips]);
  });

  return { data, valueByMaterial };
}

export function emptyBelowCurrentFloor(data, currentFloor) {
  while (currentFloor >= 0) {
    if (data[currentFloor][0] !== 0 || data[currentFloor][1] !== 0) {
      return false;
    }

    currentFloor--;
  }

  return true;
}

export function updateQueueIfSafe(
  nextData,
  currentFloor,
  nextFloor,
  nextSteps,
  queue,
  visited,
  materials
) {
  if (isSafe(nextData[currentFloor], materials) && isSafe(nextData[nextFloor], materials)) {
    const nextKey = `${nextFloor}|${JSON.stringify(nextData)}`;

    if (!visited[nextKey]) {
      visited[nextKey] = 1;
      queue.push({ floor: nextFloor, data: nextData, steps: nextSteps });
      return true;
    }
  }

  return false;
}

function isSafe([generators, microchips], materials) {
  for (const material of materials) {
    if (generators && microchips & material && !(generators & material)) {
      return false;
    }
  }

  return true;
}
