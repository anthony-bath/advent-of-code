import fs from "fs";

export const loadData = () => {
  let xMax = 0;
  let yMax = 0;

  const coords = fs
    .readFileSync("./13/input-1.txt")
    .toString()
    .split("\n")
    .map((entry) => {
      const [x, y] = entry
        .trim()
        .split(",")
        .map((val) => parseInt(val));

      xMax = Math.max(x, xMax);
      yMax = Math.max(y, yMax);

      return [x, y];
    });

  const folds = fs
    .readFileSync("./13/input-2.txt")
    .toString()
    .split("\n")
    .map((line) => {
      const [dir, point] = line.trim().replace("fold along ", "").split("=");
      return [dir, parseInt(point)];
    });

  return { xMax, yMax, coords, folds };
};
