import Algorithms

struct Day12: AdventDay {
  var data: String
  var lines: [String]

  func getMatches(arrangement: String, groups: [Int]) -> Int {
    var cache: [String: Int] = [:]

    func count(arrangement: String, groups: [Int]) -> Int {
      if arrangement.isEmpty {
        return groups.isEmpty ? 1 : 0
      }

      if groups.isEmpty {
        return arrangement.contains("#") ? 0 : 1
      }

      let key = "\(arrangement)-\(groups)"

      if cache.keys.contains(key) {
        return cache[key]!
      }

      var result = 0

      if arrangement.first == "." || arrangement.first == "?" {
        result += count(arrangement: String(arrangement.dropFirst()), groups: groups)
      }

      if arrangement.first == "#" || arrangement.first == "?" {
        let index = groups[0]
        if index <= arrangement.count && !String(arrangement.prefix(index))
          .contains(".") &&
          (index == arrangement
            .count || arrangement[arrangement.index(arrangement.startIndex, offsetBy: index)] !=
            "#")
        {
          result += count(
            arrangement: String(arrangement.dropFirst(index + 1)),
            groups: Array(groups.dropFirst())
          )
        }
      }

      cache[key] = result
      return result
    }

    return count(arrangement: arrangement, groups: groups)
  }

  func part1() -> Any {
    lines.reduce(0) { count, line in
      let parts = line.components(separatedBy: " ")
      let arrangement = parts[0]
      let groups = parts[1].matches(of: #/\d+/#).map { Int($0.output)! }

      return count + getMatches(arrangement: arrangement, groups: groups)
    }
  }

  func part2() -> Any {
    lines.reduce(0) { count, line in
      let parts = line.components(separatedBy: " ")
      let arrangement = parts[0]
      let groups = parts[1].matches(of: #/\d+/#).map { Int($0.output)! }
      let unfoldedGroups = Array(repeating: groups, count: 5).flatMap { $0 }
      let unfoldedArrangement = Array(repeating: arrangement, count: 5).joined(separator: "?")

      return count + getMatches(arrangement: unfoldedArrangement, groups: unfoldedGroups)
    }
  }
}
