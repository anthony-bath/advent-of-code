import Algorithms

extension Year2024 {
  struct Day02: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      lines.filter { evaluate(numbers: $0.split(whereSeparator: \.isWhitespace).map { Int($0)! }) }
        .count
    }

    func part2() -> Any {
      var safe = 0

      for line in lines {
        let numbers = line.split(whereSeparator: \.isWhitespace).map { Int($0)! }
        let options = numbers.indices.map { numbers[..<$0] + numbers[($0 + 1)...] }

        if options.contains(where: { evaluate(numbers: Array($0)) }) {
          safe += 1
        }
      }

      return safe
    }

    func evaluate(numbers: [Int]) -> Bool {
      var diffs = [Int]()

      for i in 0 ..< numbers.count - 1 {
        let diff = numbers[i] - numbers[i + 1]

        if diff == 0 || abs(diff) > 3 {
          return false
        }

        diffs.append(diff)
      }

      return diffs.allSatisfy { $0 > 0 } || diffs.allSatisfy { $0 < 0 }
    }
  }
}
