import Foundation

let fileURL = URL(fileURLWithPath: "2023/06/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let times = lines[0].matches(of: #/\d+/#).map { Int($0.output)! }
let distances = lines[1].matches(of: #/\d+/#).map { Int($0.output)! }

func solveQuadratic(_ a: Int, _ b: Int, _ c: Int) -> (x1: Double, x2: Double) {
  let root = sqrt(Double(b * b - 4 * a * c))
  return (x1: (Double(-b) + root) / 2, x2: (Double(-b) - root) / 2)
}

let result: Int = times.enumerated().reduce(1) { result, timeEnumerated in
  let (index, time) = timeEnumerated
  let (x1, x2) = solveQuadratic(1, -time, distances[index])
  let chances = Int(floor(x1)) - Int(ceil(x2)) + 1

  return result * chances
}

print("2023 Day 6 Part 1: \(String(result))")
