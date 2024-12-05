import Algorithms

extension Year2024 {
  struct Day03: AdventDay {
    var data: String
    var muls: [Regex<Regex<(Substring, X: Substring, Y: Substring)>.RegexOutput>.Match]

    init(data: String, lines _: [String]) {
      self.data = data

      let mulExpr = #/mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/#
      muls = data.matches(of: mulExpr)
    }

    func part1() -> Any {
      muls.reduce(0) { $0 + Int($1.output.X)! * Int($1.output.Y)! }
    }

    func part2() -> Any {
      enum OpType {
        case enableMul
        case disableMul
        case mul(Int, Int)
      }

      let dos = data.matches(of: #/do\(\)/#)
      let donts = data.matches(of: #/don't\(\)/#)

      var ops = [(type: OpType, index: String.Index)]()

      for doOp in dos {
        ops.append((.enableMul, doOp.range.lowerBound))
      }

      for dontOp in donts {
        ops.append((.disableMul, dontOp.range.lowerBound))
      }

      for mul in muls {
        ops.append((.mul(Int(mul.output.X)!, Int(mul.output.Y)!), mul.range.lowerBound))
      }

      ops.sort { $0.index < $1.index }

      var mulEnabled = true
      var total = 0

      for op in ops {
        switch op.type {
        case .enableMul: mulEnabled = true
        case .disableMul: mulEnabled = false
        case let .mul(x, y):
          if mulEnabled { total += x * y }
        }
      }

      return total
    }
  }
}
