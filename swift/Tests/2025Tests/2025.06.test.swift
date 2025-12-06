import Testing
@testable import AdventOfCode

struct Year2025Day06Tests {
  let day = Year2025.Day06(challengeYear: 2025)

  @Test("Day 6, Part 1") func part1() {
    #expect(day.part1() as? Int == 6_171_290_547_579)
  }

  @Test("Day 6, Part 2") func part2() {
    #expect(day.part2() as? Int == 8_811_937_976_367)
  }
}
