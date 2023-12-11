import Algorithms

struct Day02: AdventDay {
  var data: String
  var lines: [String]

  let expr = #/(?<count>\d+)\s(?<color>\w+)/#

  func part1() -> Any {
    let MAXES: [Substring: Int] = ["red": 12, "green": 13, "blue": 14]

    return lines.reduce(0) { total, line in
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
  }

  func part2() -> Any {
    return lines.reduce(0) { total, line in
      let matches = line.matches(of: expr)
      var counts: [Substring: Int] = ["red": 0, "green": 0, "blue": 0]

      for match in matches {
        let (_, count, color) = match.output
        counts[color] = max(Int(count)!, counts[color]!)
      }

      return total + counts.values.reduce(1) { $0 * $1 }
    }
  }
}
