import Foundation

let fileURL = URL(fileURLWithPath: "2023/01/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let expr1 = #/(\d|one|two|three|four|five|six|seven|eight|nine).*/#
let expr2 = #/.*(\d|one|two|three|four|five|six|seven|eight|nine)/#
let DIGIT_MAP: [String: Int] = [
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
]

var total: Int = 0

for line in lines {
  guard let result1 = line.firstMatch(of: expr1) else { continue }
  guard let result2 = line.firstMatch(of: expr2) else { continue }

  let first = DIGIT_MAP[String(result1.1)]!
  let last = DIGIT_MAP[String(result2.1)]!

  total += Int("\(first)\(last)")!
}

print("2023 Day 1 Part 2: \(total)")
