import Testing
@testable import AdventOfCode

struct Year2024Day06Tests {
  let day = Year2024.Day06(challengeYear: 2024)

  @Test("Day 6, Part 1") func part1() {
    #expect(day.part1() as? Int == 5129)
  }

  @Test("Day 6, Part 2") func part2() {
    #expect(day.part2() as? Int == 1888)
  }
}
