import Algorithms

extension Year2024 {
  struct Day01: AdventDay {
    var data: String
    var lines: [String]

    private var list1: [Int]
    private var list2: [Int]

    init(data: String, lines: [String]) {
      self.data = data
      self.lines = lines

      let locationIds = lines.map { $0.split(whereSeparator: \.isWhitespace).map { Int($0)! } }
      list1 = locationIds.map { $0[0] }.sorted()
      list2 = locationIds.map { $0[1] }.sorted()
    }

    func part1() -> Any {
      list1.enumerated().map { abs($1 - list2[$0]) }.reduce(0, +)
    }

    func part2() -> Any {
      // TODO: Could be a useful utility for frequency maps [T] -> [T: Int]
      let list2freq = list2.reduce(into: [:]) { $0[$1, default: 0] += 1 }

      return list1.map { (list2freq[$0] ?? 0) * $0 }.reduce(0, +)
    }
  }
}
