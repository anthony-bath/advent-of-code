import fs from "fs";

const lines = fs
  .readFileSync("./10/input.txt")
  .toString()
  .split("\n")
  .map((l) => l.trim().split(""));

const OPEN = ["(", "[", "<", "{"];
const CLOSE = [")", "]", ">", "}"];
const SCORE_MAP = { ")": 1, "]": 2, "}": 3, ">": 4 };

let scores = [];

for (const line of lines) {
  const stack = [];
  let invalid = false;

  for (const char of line) {
    if (OPEN.includes(char)) {
      stack.push(char);
    } else {
      const expected = CLOSE[OPEN.indexOf(stack.pop())];

      if (char !== expected) {
        invalid = true;
        break;
      }
    }
  }

  if (!invalid) {
    let score = 0;

    while (stack.length) {
      score *= 5;
      score += SCORE_MAP[CLOSE[OPEN.indexOf(stack.pop())]];
    }

    scores.push(score);
  }
}

scores.sort((a, b) => a - b);

fs.writeFileSync(
  "./10/part-2/output.txt",
  scores[Math.floor(scores.length / 2)].toString()
);
