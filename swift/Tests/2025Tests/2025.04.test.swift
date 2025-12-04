import Testing
@testable import AdventOfCode

struct Year2025Day04Tests {
  let day = Year2025.Day04(challengeYear: 2025)

  @Test("Day 4, Part 1") func part1() {
    #expect(day.part1() as? Int == 1478)
  }

  @Test("Day 4, Part 2") func part2() {
    #expect(day.part2() as? Int == 9120)
  }
}
