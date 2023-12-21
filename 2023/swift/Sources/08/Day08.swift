import Algorithms
import Foundation

struct Day08: AdventDay {
  var data: String
  var lines: [String]

  func part1() -> Any {
    let directions = getDirections()
    let nodes = getNodes()

    var step = 0
    var node = "AAA"

    while node != "ZZZ" {
      let dir = directions[step % directions.count]

      if dir == "L" {
        node = nodes[node]!.L
      } else {
        node = nodes[node]!.R
      }

      step = step + 1
    }

    return step
  }

  func part2() -> Any {
    let directions = getDirections()
    let nodes = getNodes()

    let startNodes = nodes.keys.filter { $0.hasSuffix("A") }

    let steps = startNodes.map {
      var step = 0
      var node = $0

      while !node.hasSuffix("Z") {
        let dir = directions[step % directions.count]

        if dir == "L" {
          node = nodes[node]!.L
        } else {
          node = nodes[node]!.R
        }

        step = step + 1
      }

      return step
    }

    return Math.lcm(steps)
  }

  func getNodes() -> [String: (L: String, R: String)] {
    var output: [String: (L: String, R: String)] = [:]

    lines.suffix(from: 2).forEach {
      let match = $0.firstMatch(of: #/(?<node>\w{3}) = \((?<L>\w{3}), (?<R>\w{3})\)/#)

      if let match = match {
        let (_, node, L, R) = match.output
        output[String(node)] = (L: String(L), R: String(R))
      }
    }

    return output
  }

  func getDirections() -> [String] {
    lines[0].map { String($0) }
  }
}
