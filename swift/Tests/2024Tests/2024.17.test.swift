import Testing
@testable import AdventOfCode

struct Year2024Day17Tests {
  let day = Year2024.Day17(challengeYear: 2024)

  @Test("Day 17, Part 1") func part1() {
    #expect(day.part1() as? String == "4,0,4,7,1,2,7,1,6")
  }

  @Test("Day 17, Part 2") func part2() {
    #expect(day.part2() as? Int == 202_322_348_616_234)
  }
}
