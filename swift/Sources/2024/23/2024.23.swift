import Algorithms
import Foundation

extension Year2024 {
  struct Day23: AdventDay {
    var graph: [String: Set<String>] = [:]

    init(data _: String, lines: [String]) {
      let expr = #/(?<from>[a-z]+)-(?<to>[a-z]+)/#

      for line in lines {
        if let match = line.firstMatch(of: expr) {
          let from = String(match.from)
          let to = String(match.to)

          graph[from, default: []].insert(to)
          graph[to, default: []].insert(from)
        }
      }
    }

    func part1() -> Any {
      var groups: Set<Set<String>> = []

      for (from, tos) in graph {
        guard from.starts(with: "t") else { continue }

        for to in tos {
          for toto in graph[to]! {
            if graph[toto]!.contains(from) {
              groups.insert(Set([from, to, toto]))
            }
          }
        }
      }

      return groups.count
    }

    func part2() -> Any {
      var countByGroup: [Set<String>: Int] = [:]

      for (from, tos) in graph {
        for to in tos {
          let intersection = tos.union([from]).intersection(graph[to]!.union([to]))
          countByGroup[intersection, default: 0] += 1
        }
      }

      let result = countByGroup.keys.first { countByGroup[$0] == countByGroup.values.max() }!

      return result.sorted().joined(separator: ",")
    }
  }
}
