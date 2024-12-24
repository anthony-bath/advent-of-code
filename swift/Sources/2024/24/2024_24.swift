import Algorithms

extension Year2024 {
  struct Day24: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let parts = data.split(separator: "\n\n")
      var wires: [String: Int] = [:]
      let expr1 = #/(?<wire>[xy]\d{2}): (?<value>[10])/#

      for input in parts[0].split(separator: "\n") {
        if let match = input.firstMatch(of: expr1) {
          wires[String(match.wire)] = Int(String(match.value))!
        }
      }

      var queue: [(left: String, op: (Int, Int) -> Int, right: String, out: String)] = []
      let expr2 =
        #/(?<left>[a-z0-9]{3}) (?<op>[A-Z]+) (?<right>[a-z0-9]{3}) -> (?<out>[a-z0-9]{3})/#

      for line in parts[1].split(separator: "\n") {
        if let match = line.firstMatch(of: expr2) {
          let op: (Int, Int) -> Int

          switch match.op {
          case "AND":
            op = { $0 & $1 }
          case "OR":
            op = { $0 | $1 }
          case "XOR":
            op = { $0 ^ $1 }
          default:
            fatalError()
          }

          queue.append((
            left: String(match.left),
            op: op,
            right: String(match.right),
            out: String(match.out)
          ))
        }
      }

      while !queue.isEmpty {
        let (left, op, right, out) = queue.removeFirst()

        let leftValue = wires[left, default: -1]
        let rightValue = wires[right, default: -1]

        if leftValue == -1 || rightValue == -1 {
          queue.append((left, op, right, out))
          continue
        }

        wires[out] = op(leftValue, rightValue)
      }

      let result = wires.keys.filter { $0.hasPrefix("z") }
        .sorted { $0 > $1 }
        .map { "\(wires[$0]!)" }
        .joined()

      return Int(result, radix: 2)!
    }

    func part2() -> Any {
      0
    }
  }
}
