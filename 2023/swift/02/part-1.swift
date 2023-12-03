import Foundation

let fileURL = URL(fileURLWithPath: "2023/02/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let MAXES: [Substring: Int] = ["red": 12, "green": 13, "blue": 14]

let expr = #/(?<count>\d+)\s(?<color>\w+)/#

let total = lines.reduce(0) { _, line in
  let idMatch = (try! #/\d+/#.firstMatch(in: line))!
  let id = Int(idMatch.output)!
  let matches = line.matches(of: expr)
  var possible = true

  for match in matches {
    let (_, count, color) = match.output

    if Int(count)! > MAXES[color]! {
      possible = false
      break
    }
  }

  return total + (possible ? id : 0)
}

print("2023 Day 2 Part 1: \(total)")
