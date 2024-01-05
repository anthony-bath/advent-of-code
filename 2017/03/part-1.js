import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 3, 1];

const location = Number(readOld(YEAR, DAY, PART));

let sideLength = Math.ceil(Math.sqrt(location));

if (sideLength % 2 === 0) {
  sideLength++;
}

const bottomCenter = sideLength * sideLength - Math.floor(sideLength / 2);
const centers = [...Array(4).keys()].map((i) => bottomCenter - i * (sideLength - 1));
const centerDiffs = centers.map((center) => Math.abs(location - center));
const distance = Math.floor(sideLength / 2);

write(YEAR, DAY, PART, distance + Math.min(...centerDiffs));

//1   => 2-9      (3)
//2   => 10-25    (5)
//3   => 26-49    (7)
//4   => 50-81    (9)
//5   => 82-121   (11)
//6   => 122-169  (13)
//7   => 170-225  (15)
//8   => 226-289  (17)
//9   => 290-361  (19)
//10  => 326-441  (21)
//11  => 442-529  (23)
//12  => 530-625  (25)
//13  => 626-729  (27)
//14  => 730-841  (29)
//15  => 842-961  (31)
//16  => 952-1089 (33)
