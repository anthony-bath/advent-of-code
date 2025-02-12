import Testing
@testable import AdventOfCode

struct Year2024Day07Tests {
  let day = Year2024.Day07(challengeYear: 2024)

  @Test("Day 7, Part 1") func part1() {
    #expect(day.part1() as? Int == 6_083_020_304_036)
  }

  @Test("Day 7, Part 2") func part2() {
    #expect(day.part2() as? Int == 59_002_246_504_791)
  }
}
