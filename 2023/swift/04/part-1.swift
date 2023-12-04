import Foundation

let fileURL = URL(fileURLWithPath: "2023/04/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let score = lines.reduce(0) { _, card in
  let numbers = card.matches(of: #/\d+/#).map { String($0.output) }
  let winningNumbers = Array(numbers[1 ... 10])
  let myNumbers = Array(numbers[11 ..< numbers.count])
  let matches = myNumbers.filter { winningNumbers.contains($0) }

  return score + (matches.count > 0 ? (1 << (matches.count - 1)) : 0)
}

print("2023 Day 4 Part 1: \(score)")
