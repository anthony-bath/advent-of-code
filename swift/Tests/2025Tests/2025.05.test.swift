import Testing
@testable import AdventOfCode

struct Year2025Day05Tests {
  let day = Year2025.Day05(challengeYear: 2025)

  @Test("Day 5, Part 1") func part1() {
    #expect(day.part1() as? Int == 789)
  }

  @Test("Day 5, Part 2") func part2() {
    #expect(day.part2() as? Int == 343_329_651_880_509)
  }
}
