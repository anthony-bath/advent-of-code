import Foundation

let fileURL = URL(fileURLWithPath: "2023/06/input.txt")
let input = try? String(contentsOf: fileURL, encoding: .utf8)
let lines = input!.components(separatedBy: .newlines)

let time = Int(lines[0].matches(of: #/\d+/#).map { String($0.output) }.joined())!
let distance = Int(lines[1].matches(of: #/\d+/#).map { String($0.output) }.joined())!

func solveQuadratic(_ a: Int, _ b: Int, _ c: Int) -> (x1: Double, x2: Double) {
  let root = sqrt(Double(b * b - 4 * a * c))
  return (x1: (Double(-b) + root) / 2, x2: (Double(-b) - root) / 2)
}

let (x1, x2) = solveQuadratic(1, -time, distance)
let chances: Int = .init(floor(x1)) - Int(ceil(x2)) + 1

print("2023 Day 6 Part 2: \(String(chances))")
