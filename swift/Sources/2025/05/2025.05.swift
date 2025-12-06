import Algorithms

extension Year2025 {
  struct Day05: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      var ranges: [(start: Int, end: Int)] = []
      var fresh = 0

      for line in lines {
        guard !line.isEmpty else { continue }

        if line.contains("-") {
          let parts = line.split(separator: "-")
          ranges.append((Int(parts[0])!, Int(parts[1])!))
          continue
        }

        let id = Int(line)!

        if ranges.contains(where: { id >= $0.start && id <= $0.end }) {
          fresh += 1
        }
      }

      return fresh
    }

    func part2() -> Any {
      var ranges: [(start: Int, end: Int)] = []

      for line in lines {
        guard !line.isEmpty else { break }

        let parts = line.split(separator: "-")
        ranges.append((Int(parts[0])!, Int(parts[1])!))
      }

      ranges.sort { $0.start < $1.start }

      var fresh = 0
      var current = 0

      for (start, end) in ranges {
        guard current < end else { continue }

        fresh += (end - max(current + 1, start) + 1)
        current = end
      }

      return fresh
    }
  }
}
