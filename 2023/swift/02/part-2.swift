import Foundation

let fileURL = URL(fileURLWithPath: "2023/02/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let expr = #/(?<count>\d+)\s(?<color>\w+)/#

let total = lines.reduce(0) { _, line in
  let matches = line.matches(of: expr)
  var counts: [Substring: Int] = ["red": 0, "green": 0, "blue": 0]

  for match in matches {
    let (_, count, color) = match.output
    counts[color] = max(Int(count)!, counts[color]!)
  }

  return total + counts.values.reduce(1) { $0 * $1 }
}

print("2023 Day 2 Part 2: \(total)")
