import Testing
@testable import AdventOfCode

struct Year2024Day15Tests {
  let day = Year2024.Day15(challengeYear: 2024)

  @Test("Day 15, Part 1") func part1() {
    #expect(day.part1() as? Int == 1_430_439)
  }

  @Test("Day 15, Part 2") func part2() {
    #expect(day.part2() as? Int == 1_458_740)
  }
}
