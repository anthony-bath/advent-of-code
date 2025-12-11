import Testing
@testable import AdventOfCode

struct Year2025Day11Tests {
  let day = Year2025.Day11(challengeYear: 2025)

  @Test("Day 11, Part 1") func part1() {
    #expect(day.part1() as? Int == 448)
  }

  @Test("Day 11, Part 2") func part2() {
    #expect(day.part2() as? Int == 553_204_221_431_080)
  }
}
