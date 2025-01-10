import Algorithms

extension Year2024 {
  struct Day19: AdventDay {
    var patterns: [String]
    var designs: [String]

    init(data _: String, lines: [String]) {
      patterns = lines[0].split(separator: ", ").map { String($0) }
      designs = lines[2...].map { String($0) }
    }

    func part1() -> Any {
      var cache = [String: Bool]()

      func canForm(design: String) -> Bool {
        if let cached = cache[design] {
          return cached
        }

        if design == "" {
          return true
        }

        let result = patterns.contains { pattern in
          if design.hasPrefix(pattern) {
            return canForm(design: String(design.dropFirst(pattern.count)))
          }
          return false
        }

        cache[design] = result
        return result
      }

      return designs.filter { canForm(design: $0) }.count
    }

    func part2() -> Any {
      var cache = [String: Int]()

      func countForms(design: String) -> Int {
        if design == "" {
          return 1
        }

        if let cached = cache[design] {
          return cached
        }

        var count = 0
        for pattern in patterns {
          if design.hasPrefix(pattern) {
            count += countForms(design: String(design.dropFirst(pattern.count)))
          }
        }

        cache[design] = count
        return count
      }

      return designs.reduce(0) { $0 + countForms(design: $1) }
    }
  }
}
