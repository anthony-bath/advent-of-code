import Testing
@testable import AdventOfCode

struct Year2024Day05Tests {
  let day = Year2024.Day05(challengeYear: 2024)

  @Test("Day 5, Part 1") func part1() {
    #expect(day.part1() as? Int == 4905)
  }

  @Test("Day 5, Part 2") func part2() {
    #expect(day.part2() as? Int == 6204)
  }
}
