import Testing
@testable import AdventOfCode

struct Year2024Day18Tests {
  let day = Year2024.Day18(challengeYear: 2024)

  @Test("Day 18, Part 1") func part1() {
    #expect(day.part1() as? Int == 334)
  }

  @Test("Day 18, Part 2") func part2() {
    #expect(day.part2() as? String == "20,12")
  }
}
