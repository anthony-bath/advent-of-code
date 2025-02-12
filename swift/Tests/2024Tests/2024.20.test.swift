import Testing
@testable import AdventOfCode

struct Year2024Day20Tests {
  let day = Year2024.Day20(challengeYear: 2024)

  @Test("Day 20, Part 1") func part1() {
    #expect(day.part1() as? Int == 1197)
  }

  @Test("Day 20, Part 2") func part2() {
    #expect(day.part2() as? Int == 944_910)
  }
}
