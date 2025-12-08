import Testing
@testable import AdventOfCode

struct Year2025Day08Tests {
  let day = Year2025.Day08(challengeYear: 2025)

  @Test("Day 8, Part 1") func part1() {
    #expect(day.part1() as? Int == 96672)
  }

  @Test("Day 8, Part 2") func part2() {
    #expect(day.part2() as? Int == 22_517_595)
  }
}
