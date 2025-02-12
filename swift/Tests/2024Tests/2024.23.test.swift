import Testing
@testable import AdventOfCode

struct Year2024Day23Tests {
  let day = Year2024.Day23(challengeYear: 2024)

  @Test("Day 23, Part 1") func part1() {
    #expect(day.part1() as? Int == 1156)
  }

  @Test("Day 23, Part 2") func part2() {
    #expect(day.part2() as? String == "bx,cx,dr,dx,is,jg,km,kt,li,lt,nh,uf,um")
  }
}
