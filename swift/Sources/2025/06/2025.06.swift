import Algorithms

extension Year2025 {
  struct Day06: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let ops = lines.last!.split(separator: " ")
      var results: [Int] = ops.map { $0 == "*" ? 1 : 0 }

      for line in lines.dropLast() {
        for (col, num) in line.split(separator: " ").enumerated() {
          if ops[col] == "*" {
            results[col] *= Int(String(num))!
          } else {
            results[col] += Int(String(num))!
          }
        }
      }

      return results.reduce(0) { $0 + $1 }
    }

    func part2() -> Any {
      var equations: [Equation] = []

      for (i, char) in lines.last!.enumerated() {
        if char != " " {
          equations.last?.end = i - 2
          equations.append(Equation(op: String(char), start: i))
        }
      }

      equations.last?.end = lines.last!.count - 1

      for equation in equations {
        for col in stride(from: equation.end!, to: equation.start - 1, by: -1) {
          var num = ""

          for line in lines.dropLast() {
            let index = line.index(line.startIndex, offsetBy: col)
            num += line[index ... index]
          }

          if let parsed = Int(num.trimmingCharacters(in: .whitespacesAndNewlines)) {
            equation.update(parsed)
          }
        }
      }

      return equations.reduce(0) { $0 + $1.result }
    }

    class Equation {
      let op: String
      let start: Int
      var end: Int?
      var result: Int

      init(op: String, start: Int) {
        self.op = op
        self.start = start
        result = op == "*" ? 1 : 0
      }

      func update(_ num: Int) {
        if op == "*" {
          result *= num
        } else {
          result += num
        }
      }
    }
  }
}
