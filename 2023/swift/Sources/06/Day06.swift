import Algorithms
import Foundation

struct Day06: AdventDay {
  var data: String
  var lines: [String]

  func part1() -> Any {
    let times = lines[0].matches(of: #/\d+/#).map { Int($0.output)! }
    let distances = lines[1].matches(of: #/\d+/#).map { Int($0.output)! }

    return times.enumerated().reduce(1) { result, timeEnumerated in
      let (index, time) = timeEnumerated
      let (x1, x2) = solveQuadratic(1, -time, distances[index])
      let chances = Int(floor(x1)) - Int(ceil(x2)) + 1

      return result * chances
    }
  }

  func part2() -> Any {
    let time = Int(lines[0].matches(of: #/\d+/#).map { String($0.output) }.joined())!
    let distance = Int(lines[1].matches(of: #/\d+/#).map { String($0.output) }.joined())!

    let (x1, x2) = solveQuadratic(1, -time, distance)
    let chances: Int = .init(floor(x1)) - Int(ceil(x2)) + 1

    return chances
  }

  func solveQuadratic(_ a: Int, _ b: Int, _ c: Int) -> (x1: Double, x2: Double) {
    let root = sqrt(Double(b * b - 4 * a * c))
    return (x1: (Double(-b) + root) / 2, x2: (Double(-b) - root) / 2)
  }
}
