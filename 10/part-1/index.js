import fs from "fs";

const lines = fs
  .readFileSync("./10/input.txt")
  .toString()
  .split("\n")
  .map((l) => l.trim().split(""));

const OPEN = ["(", "[", "<", "{"];
const CLOSE = [")", "]", ">", "}"];
const SCORE_MAP = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

let score = 0;

for (const line of lines) {
  const stack = [];

  for (const char of line) {
    if (OPEN.includes(char)) {
      stack.push(char);
    } else {
      const expected = CLOSE[OPEN.indexOf(stack.pop())];

      if (char !== expected) {
        score += SCORE_MAP[char];
        break;
      }
    }
  }
}

fs.writeFileSync("./10/part-1/output.txt", score.toString());
