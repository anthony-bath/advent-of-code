import Testing
@testable import AdventOfCode

struct Year2024Day25Tests {
  let day = Year2024.Day25(challengeYear: 2024)

  @Test("Day 25, Part 1") func part1() {
    #expect(day.part1() as? Int == 3021)
  }

  @Test("Day 25, Part 2") func part2() {
    #expect(day.part2() as? Int == 0)
  }
}
