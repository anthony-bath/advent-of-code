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
      let uf = UnionFind(lights)

      for pair in pairs {
        if uf.union(pair.p1, pair.p2) {
          let root = uf.find(pair.p1)

          if uf.size[root]! == lights.count {
            return pair.p1.x * pair.p2.x
          }
        }
      }

      return 0
    }
  }
}
