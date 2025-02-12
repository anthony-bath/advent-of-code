import Testing
@testable import AdventOfCode

struct Year2024Day16Tests {
  let day = Year2024.Day16(challengeYear: 2024)

  @Test("Day 16, Part 1") func part1() {
    #expect(day.part1() as? Int == 75416)
  }

  @Test("Day 16, Part 2") func part2() {
    #expect(day.part2() as? Int == 476)
  }
}
