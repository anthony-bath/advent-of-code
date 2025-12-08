import Algorithms
import Darwin

extension Year2025 {
  struct Day08: AdventDay {
    var lights: [Geometry.Point3D] = []
    var pairs: [(p1: Geometry.Point3D, p2: Geometry.Point3D, distance: Double)] = []

    init(data _: String, lines: [String]) {
      for line in lines {
        let coords = line.split(separator: ",").map { Int(String($0))! }
        lights.append(Geometry.Point3D(coords))
      }

      for light1 in lights {
        for light2 in lights {
          guard light1 != light2 else { continue }
          pairs.append((p1: light1, p2: light2, distance: light1.distance(from: light2)))
        }
      }

      pairs = pairs.sorted(by: { $0.distance < $1.distance }).enumerated()
        .filter { $0.offset % 2 == 0 }.map { $0.element }
    }

    func part1() -> Any {
      var graph: [Geometry.Point3D: Set<Geometry.Point3D>] = lights
        .reduce(into: [:]) { $0[$1] = [] }

      for pair in pairs[0 ..< 1000] {
        graph[pair.p1]!.insert(pair.p2)
        graph[pair.p2]!.insert(pair.p1)
      }

      var circuits: [Set<Geometry.Point3D>] = []
      var visited = Set<Geometry.Point3D>()

      for (light, connections) in graph {
        guard !visited.contains(light) else { continue }
        guard !connections.isEmpty else { continue }

        var circuit = Set<Geometry.Point3D>()
        var queue = [light]

        while !queue.isEmpty {
          let next = queue.removeLast()

          if !visited.contains(next) {
            circuit.insert(next)
            visited.insert(next)

            for cl in graph[next]! {
              if !visited.contains(cl) {
                queue.append(cl)
              }
            }
          }
        }

        circuits.append(circuit)
      }

      return circuits.map { $0.count }.sorted { $0 > $1 }[0 ... 2].reduce(1) { $1 * $0 }
    }

    func part2() -> Any {
      var circuits: [Set<Geometry.Point3D>] = []

      for pair in pairs {
        let p1Ci = circuits.firstIndex { $0.contains(pair.p1) }
        let p2Ci = circuits.firstIndex { $0.contains(pair.p2) }

        if p1Ci != nil && p2Ci != nil && p1Ci == p2Ci {
          continue
        } else if let p1Ci, let p2Ci {
          circuits[p1Ci] = circuits[p1Ci].union(circuits[p2Ci])

          if circuits[p1Ci].count == 1000 {
            return pair.p1.x * pair.p2.x
          }

          circuits.remove(at: p2Ci)
        } else if let p1Ci, p2Ci == nil {
          circuits[p1Ci].insert(pair.p2)

          if circuits[p1Ci].count == 1000 {
            return pair.p1.x * pair.p2.x
          }
        } else if let p2Ci, p1Ci == nil {
          circuits[p2Ci].insert(pair.p1)

          if circuits[p2Ci].count == 1000 {
            return pair.p1.x * pair.p2.x
          }
        } else {
          circuits.append([pair.p1, pair.p2])
        }
      }

      return 0
    }
  }
}
