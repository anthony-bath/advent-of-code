import { sum } from '../../utilities/array.js';

export function part1({ lines }) {
  const workflows = new Map();
  const parts = [];
  let parsingParts = false;

  const expr = /(?<name>\w+)\{(?<ruleList>.*)\}/;

  for (const line of lines) {
    if (!line) {
      parsingParts = true;
      continue;
    }

    if (!parsingParts) {
      const { name, ruleList } = line.match(expr).groups;
      const rules = [];

      for (const rule of ruleList.split(',')) {
        if (rule.includes(':')) {
          const [criteria, result] = rule.split(':');
          const property = criteria[0];
          const op = criteria[1];
          const value = Number(criteria.slice(2));

          if (op === '>') {
            rules.push((obj) => (obj[property] > value ? result : false));
          } else {
            rules.push((obj) => (obj[property] < value ? result : false));
          }
        } else {
          rules.push(rule);
        }
      }

      workflows.set(name, rules);
    } else {
      const [x, m, a, s] = line.match(/\d+/g).map(Number);
      parts.push({ x, m, a, s });
    }
  }

  function isAccepted(part, workflowName) {
    let workflow = workflows.get(workflowName);

    for (const rule of workflow) {
      if (typeof rule === 'function') {
        const result = rule(part);

        if (!result) continue;
        if (result === 'R') return false;
        if (result === 'A') return true;

        return isAccepted(part, result);
      } else {
        if (rule === 'R') return false;
        if (rule === 'A') return true;

        return isAccepted(part, rule);
      }
    }
  }

  return parts
    .filter((part) => isAccepted(part, 'in'))
    .reduce((total, part) => total + sum(Object.values(part)), 0);
}
