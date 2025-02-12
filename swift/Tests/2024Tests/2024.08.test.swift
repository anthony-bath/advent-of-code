import Testing
@testable import AdventOfCode

struct Year2024Day08Tests {
  let day = Year2024.Day08(challengeYear: 2024)

  @Test("Day 8, Part 1") func part1() {
    #expect(day.part1() as? Int == 348)
  }

  @Test("Day 8, Part 2") func part2() {
    #expect(day.part2() as? Int == 1221)
  }
}
