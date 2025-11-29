import Testing
@testable import AdventOfCode

struct Year2025Day01Tests {
  let day = Year2025.Day01(challengeYear: 2025)

  @Test("Day 1, Part 1") func part1() {
    #expect(day.part1() as? Int == 0)
  }

  @Test("Day 1, Part 2") func part2() {
    #expect(day.part2() as? Int == 0)
  }
}
