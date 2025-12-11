import Testing
@testable import AdventOfCode

struct Year2025Day10Tests {
  let day = Year2025.Day10(challengeYear: 2025)

  @Test("Day 10, Part 1") func part1() {
    #expect(day.part1() as? Int == 491)
  }

  @Test("Day 10, Part 2") func part2() {
    #expect(day.part2() as? Int == 20617)
  }
}
