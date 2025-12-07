import Testing
@testable import AdventOfCode

struct Year2025Day07Tests {
  let day = Year2025.Day07(challengeYear: 2025)

  @Test("Day 7, Part 1") func part1() {
    #expect(day.part1() as? Int == 1642)
  }

  @Test("Day 7, Part 2") func part2() {
    #expect(day.part2() as? Int == 47_274_292_756_692)
  }
}
