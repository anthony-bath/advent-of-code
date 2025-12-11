import Algorithms

extension Year2025 {
  struct Day11: AdventDay {
    var network: [String: Set<String>]

    init(data _: String, lines: [String]) {
      var network: [String: Set<String>] = [:]

      for line in lines {
        let servers = line.replacing(":", with: "").split(separator: " ").map { String($0) }
        network[servers.first!] = Set(servers[1...])
      }

      self.network = network
    }

    func part1() -> Any {
      var cache: [String: Int] = [:]

      func dfs(_ server: String) -> Int {
        if server == "out" {
          return 1
        }

        if let cached = cache[server] {
          return cached
        }

        var result = 0

        for connection in network[server]! {
          result += dfs(connection)
        }

        cache[server] = result
        return result
      }

      return dfs("you")
    }

    func part2() -> Any {
      let scenarios = [
        Scenario(network: network, path: ["svr", "dac", "fft", "out"]),
        Scenario(network: network, path: ["svr", "fft", "dac", "out"]),
      ]

      return scenarios.reduce(0) { $0 + $1.calculate() }
    }

    struct Scenario {
      let network: [String: Set<String>]
      let path: [String]
      var segments: [Segment] = []

      init(network: [String: Set<String>], path: [String]) {
        self.path = path
        self.network = network

        for i in 1 ..< path.count {
          segments.append(Segment(
            start: path[i - 1],
            end: path[i],
            exclude: Set(path.filter { $0 != path[i - 1] && $0 != path[i] })
          ))
        }
      }

      func calculate() -> Int {
        var counts: [Int] = []

        for segment in segments {
          var cache: [String: Int] = [:]

          func dfs(node: String, target: String) -> Int {
            if segment.exclude.contains(node) {
              return 0
            }

            if node == target {
              return 1
            }

            if let cached = cache[node] {
              return cached
            }

            var result = 0

            for connection in network[node]! {
              result += dfs(node: connection, target: target)
            }

            cache[node] = result
            return result
          }

          counts.append(dfs(node: segment.start, target: segment.end))
        }

        return counts.reduce(1,*)
      }
    }

    struct Segment {
      let start: String
      let end: String
      let exclude: Set<String>
    }
  }
}
