import Algorithms

extension Year2024 {
  struct Day03: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let expr = #/mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/#
      let muls = data.matches(of: expr)

      return muls.reduce(0) { $0 + Int($1.output.X)! * Int($1.output.Y)! }
    }

    func part2() -> Any {
      let expr = #/do\(\)|don't\(\)|mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/#
      let ops = data.matches(of: expr)

      var mulEnabled = true
      var total = 0

      for op in ops {
        if op.output.0 == "do()" {
          mulEnabled = true
        } else if op.output.0 == "don't()" {
          mulEnabled = false
        } else if mulEnabled {
          total += Int(op.output.X!)! * Int(op.output.Y!)!
        }
      }

      return total
    }
  }
}
