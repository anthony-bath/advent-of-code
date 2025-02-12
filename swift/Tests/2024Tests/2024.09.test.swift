import Testing
@testable import AdventOfCode

struct Year2024Day09Tests {
  let day = Year2024.Day09(challengeYear: 2024)

  @Test("Day 9, Part 1") func part1() {
    #expect(day.part1() as? Int == 6_367_087_064_415)
  }

  @Test("Day 9, Part 2") func part2() {
    #expect(day.part2() as? Int == 6_390_781_891_880)
  }
}
