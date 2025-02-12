import Testing
@testable import AdventOfCode

struct Year2024Day22Tests {
  let day = Year2024.Day22(challengeYear: 2024)

  @Test("Day 22, Part 1") func part1() {
    #expect(day.part1() as? Int == 17_005_483_322)
  }

  @Test("Day 22, Part 2") func part2() {
    #expect(day.part2() as? Int == 1910)
  }
}
