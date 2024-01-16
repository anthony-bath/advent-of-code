import { getInputElements } from './common.js';

export function part2({ lines }) {
  const { rules, messages } = getInputElements(lines);

  const cache = {};

  function buildRule(number) {
    if (cache[number]) return cache[number];

    const rule = rules.get(number);

    if (typeof rule === 'string') {
      return [rule];
    }

    const matches = [];

    rule.forEach((combo) => {
      const parts = combo.map((ruleNumber) => {
        if (cache[ruleNumber]) {
          return cache[ruleNumber];
        }

        return buildRule(ruleNumber);
      });

      // Dynamic Nested Loop
      const iterations = parts.reduce((product, part) => product * part.length, 1);
      let iteration = 0;

      const indices = Array.from({ length: parts.length }).fill(0);
      const maxIndices = parts.map((part) => part.length - 1);

      while (iteration < iterations) {
        matches.push(parts.map((part, index) => part[indices[index]]).join(''));

        // update loop variables
        let change = true;
        let index = indices.length - 1; // innermost loop

        while (change && index >= 0) {
          if (++indices[index] > maxIndices[index]) {
            indices[index] = 0;
            change = true;
          } else {
            change = false;
          }

          index--;
        }

        iteration++;
      }
    });

    cache[number] = matches;
    return matches;
  }

  const baseRule0 = new Set(buildRule('0'));
  const rule42 = new Set(cache['42']);
  const rule31 = new Set(cache['31']);

  let matched = 0;
  const chunkExpression = new RegExp(`.{${cache['42'][0].length}}`, 'g');

  messages.forEach((message) => {
    if (baseRule0.has(message)) {
      matched++;
    } else if (
      message.length >= 32 &&
      rule42.has(message.substring(0, 8)) &&
      rule31.has(message.substring(message.length - 8))
    ) {
      const chunks = message.match(chunkExpression);

      let count31 = 0;
      let count42 = 0;
      const structure = [];

      for (const chunk of chunks) {
        if (rule42.has(chunk)) {
          structure.push(42);
          count42++;
        } else if (rule31.has(chunk)) {
          structure.push(31);
          count31++;
        }
      }

      if (structure[1] === 31) {
        // can never have 31 in second position because there
        // wouldn't be enough 42s to meet the other criteria
        return;
      }

      if (count31 >= count42) {
        // can never have more 31s than 42s; Rule 11 will always
        // have the same number of 42s and 31s (see below
        // Rule 8 will then have at least 1 additional 42
        return;
      }

      let changes = 0;
      for (let i = 1; i < structure.length; i++) {
        if (structure[i] !== structure[i - 1]) changes++;
      }

      if (changes === 1) {
        // if there is only a single change from 42 to 31, it's a valid message
        // i.e. going from 42 to 31 and then back to 42 again would represent
        //      an invalid structure
        //
        //For example, consider the (invalid) structure:
        //   42, 42, 31, 42, 31
        //    A   B   C   D   E
        // A is as far as Rule 8 matching can go because if it went to B, Rule 11
        // would not match as it starts with 42 and C is 31. Therefore, Rule 11
        // matching starts at B. But to "extend" the Rule 11 further, there needs
        // to be more consecutive 42s, because if you consider the loop portion
        // of rule 11 (42 11 31) that could become 42 42 11 31 31, and then
        // 42 42 42 11 31 31 31, and then 42 42 42 42 11 31 31 31 31 and so on,
        // and it could then terminate with the non-looping Rule 11 (42 31) i.e.
        // 42 42 42 42 42 31 31 31 31 31. So then after some number of 42s from
        // Rule 8, the overall structure represented like this could only ever
        // go from 42 -> 31 once and never back to 42 again
        matched++;
      }
    }
  });

  return matched;
}
