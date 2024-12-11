import fs from 'fs';
import path from 'path';

const year = process.argv[2];
const day = process.argv[3];

if (!year || !day) {
  console.log('Usage: node swift-day-creator.js <year> <day>');
  process.exit(1);
}

const yearDir = path.join(process.cwd(), 'swift', 'Sources', year);

if (!fs.existsSync(yearDir)) {
  fs.mkdirSync(yearDir);
}

const dayPadded = day.padStart(2, '0');
const dayDir = path.join(yearDir, dayPadded);

if (!fs.existsSync(dayDir)) {
  fs.mkdirSync(dayDir);
}

const solutionFile = path.join(dayDir, `${year}_${dayPadded}.swift`);

if (!fs.existsSync(solutionFile)) {
  fs.writeFileSync(
    solutionFile,
    `import Algorithms

extension Year${year} {
  struct Day${dayPadded}: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      0
    }

    func part2() -> Any {
      0
    }
  }
}
`
  );
}

const yearFile = path.join(yearDir, `${year}.swift`);
if (fs.existsSync(yearFile)) {
  let content = fs.readFileSync(yearFile, 'utf8');

  // Find the array in the days property
  const arrayMatch = content.match(/\[\n(.*?)\s*\]/s);
  if (arrayMatch) {
    const existingArray = arrayMatch[0];
    const newDay = `      Year${year}.Day${dayPadded}(challengeYear: ${year}),`;

    // If the array is empty, don't add a comma before the new day
    if (existingArray.trim() === '[]') {
      const updatedArray = existingArray.replace(/\s*\]/, `\n${newDay}\n    ]`);
      content = content.replace(arrayMatch[0], updatedArray);
    } else {
      // Remove any trailing comma and whitespace before the closing bracket
      const updatedArray = existingArray.replace(/,?\s*\]/, `,\n${newDay}\n    ]`);
      content = content.replace(arrayMatch[0], updatedArray);
    }

    fs.writeFileSync(yearFile, content);
  }
}

const inputText = path.join(process.cwd(), 'inputs', year, `${dayPadded}.txt`);

if (!fs.existsSync(inputText)) {
  fs.writeFileSync(inputText, '');
}

const testsYearDir = path.join(process.cwd(), 'swift', 'Tests', `${year}Tests`);

if (!fs.existsSync(testsYearDir)) {
  fs.mkdirSync(testsYearDir);
}

const testsFile = path.join(testsYearDir, `${year}.${dayPadded}.test.swift`);

if (!fs.existsSync(testsFile)) {
  fs.writeFileSync(
    testsFile,
    `import XCTest
@testable import AdventOfCode

final class Year${year}Day${dayPadded}Tests: XCTestCase {
  let day = Year${year}.Day${dayPadded}(challengeYear: ${year})

  func testPart1() async throws {
    XCTAssertEqual(day.part1() as? Int, 0)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 0)
  }
}
`
  );
}
