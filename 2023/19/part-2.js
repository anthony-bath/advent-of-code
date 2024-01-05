import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 19, 2];

const lines = readOld(YEAR, DAY, PART);
const workflows = new Map();
const expr = /(?<name>\w+)\{(?<ruleList>.*)\}/;
const indexByProperty = { x: 0, m: 1, a: 2, s: 3 };

for (const line of lines) {
  if (!line) {
    break;
  }

  const { name, ruleList } = line.match(expr).groups;
  const rules = [];

  for (const rule of ruleList.split(',')) {
    if (rule.includes(':')) {
      const [criteria, result] = rule.split(':');
      const prop = indexByProperty[criteria[0]];
      const op = criteria[1];
      const val = Number(criteria.slice(2));

      rules.push({ prop, op, val, result });
    } else {
      rules.push(rule);
    }
  }

  workflows.set(name, rules);
}

function product(ranges) {
  let result = 1;

  for (const range of ranges) {
    result *= range.end - range.start + 1;
  }

  return result;
}

let count = 0;

function countAccepted(workflowName, ranges) {
  const workflow = workflows.get(workflowName);
  const thisWorkflowRanges = ranges.map((r) => ({ ...r }));

  for (const rule of workflow) {
    if (typeof rule === 'object') {
      const { prop, op, val, result } = rule;
      const value = Number(val);

      if (result === 'R') {
        // If rejected, update this workflows ranges to be
        // the inverse of this rule
        const range = thisWorkflowRanges[prop];

        if (op === '>') {
          range.end = Math.min(range.end, value);
          range.start = Math.max(range.start, 1);
        } else {
          range.start = Math.max(range.start, value);
          range.end = Math.min(range.end, 4000);
        }
      } else if (result === 'A') {
        // If accepted, copy this workflows ranges and update the range
        // reflected in this rule (since it is required to be accepted) and
        // add the product of the ranges to the count
        const acceptedRanges = thisWorkflowRanges.map((r) => ({ ...r }));
        let range = acceptedRanges[prop];

        if (op === '>') {
          range.start = Math.max(range.start, value + 1);
          range.end = Math.min(range.end, 4000);
        } else {
          range.end = Math.min(range.end, value - 1);
          range.start = Math.max(range.start, 1);
        }

        count += product(acceptedRanges);

        // Update this workflows ranges to be the inverse of this rule
        // so that it reflects the rejection of this rule for subsequent
        // rules in this workflow
        range = thisWorkflowRanges[prop];

        if (op === '>') {
          range.end = Math.min(range.end, value);
          range.start = Math.max(range.start, 1);
        } else {
          range.start = Math.max(range.start, value);
          range.end = Math.min(range.end, 4000);
        }
      } else {
        // Result is another workflow, copy this workflows ranges and update
        // the range reflected in this rule (since it is required to be accepted
        // and continue processing the next workflow)
        const nextWorkflowRanges = thisWorkflowRanges.map((r) => ({ ...r }));
        let range = nextWorkflowRanges[prop];

        if (op === '>') {
          range.start = Math.max(range.start, value + 1);
          range.end = Math.min(range.end, 4000);
        } else {
          range.end = Math.min(range.end, value - 1);
          range.start = Math.max(range.start, 1);
        }

        countAccepted(result, nextWorkflowRanges);

        // Update this workflows ranges to be the inverse of this rule
        // so that it reflects the rejection of this rule for subsequent
        // rules in this workflow
        range = thisWorkflowRanges[prop];

        if (op === '>') {
          range.end = Math.min(range.end, value);
          range.start = Math.max(range.start, 1);
        } else {
          range.start = Math.max(range.start, value);
          range.end = Math.min(range.end, 4000);
        }
      }
    } else {
      // String Rule, always the last rule in the workflow
      if (rule === 'R') {
        // If rejected, stop processing this workflow
        break;
      } else if (rule === 'A') {
        // Accepted, add to count
        count += product(thisWorkflowRanges);
      } else {
        // Continue to next workflow
        countAccepted(rule, thisWorkflowRanges);
      }
    }
  }
}

countAccepted('in', [
  { start: 1, end: 4000 },
  { start: 1, end: 4000 },
  { start: 1, end: 4000 },
  { start: 1, end: 4000 },
]);

write(YEAR, DAY, PART, count);
