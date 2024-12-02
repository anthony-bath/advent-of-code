import Algorithms

extension Year2023 {
  struct Day03: AdventDay {
    var data: String
    var lines: [String]

    var H: Int {
      lines.count
    }

    var W: Int {
      lines[0].count
    }

    let partExpr = #/\d+/#
    let symbol = #/[^0-9\.]/#

    func isSymbol(_ position: (x: Int, y: Int)) -> Bool {
      let (x, y) = position
      guard y >= 0 && y < H && x >= 0 && x < W else { return false }

      let line = lines[y]
      let char = line[line.index(line.startIndex, offsetBy: x)]
      let match = try? symbol.firstMatch(in: String(char))

      return match != nil
    }

    func isGear(_ position: (x: Int, y: Int)) -> Bool {
      let (x, y) = position
      guard y >= 0 && y < H && x >= 0 && x < W else { return false }

      let line = lines[y]
      let char = line[line.index(line.startIndex, offsetBy: x)]

      return char == Character("*")
    }

    func getPositions(_ x: Int, _ y: Int, _ len: Int) -> [(x: Int, y: Int)] {
      var positions = [
        (x: x - 1, y: y),
        (x: x - 1, y: y - 1),
        (x: x - 1, y: y + 1),
        (x: x + len, y: y),
        (x: x + len, y: y - 1),
        (x: x + len, y: y + 1),
      ]

      for i in x ..< (x + len) {
        positions.append((x: i, y: y - 1))
        positions.append((x: i, y: y + 1))
      }

      return positions
    }

    func part1() -> Any {
      var sum = 0

      for y in 0 ..< lines.count {
        let matches = lines[y].matches(of: partExpr)

        for match in matches {
          let x = lines[y].distance(from: lines[y].startIndex, to: match.startIndex)
          let part = Int(match.output)!
          let positions = getPositions(x, y, match.output.count)

          for position in positions {
            if isSymbol(position) {
              sum += part
              break
            }
          }
        }
      }

      return sum
    }

    func part2() -> Any {
      var gears: [String: [Int]] = [:]

      func addPartToGear(_ position: (x: Int, y: Int), _ part: Int) {
        let (x, y) = position
        let key = "\(x)|\(y)"

        if !gears.keys.contains(key) {
          gears[key] = [part]
        } else {
          gears[key]!.append(part)
        }
      }

      for y in 0 ..< lines.count {
        let matches = lines[y].matches(of: partExpr)

        for match in matches {
          let x = lines[y].distance(from: lines[y].startIndex, to: match.startIndex)
          let part = Int(match.output)!

          let positions = getPositions(x, y, match.output.count)

          for position in positions {
            if isGear(position) {
              addPartToGear(position, part)
            }
          }
        }
      }

      return gears.values.reduce(0) { total, parts in
        if parts.count == 2 {
          return total + parts[0] * parts[1]
        }

        return total
      }
    }
  }
}
