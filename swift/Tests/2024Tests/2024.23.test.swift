import XCTest
@testable import AdventOfCode

final class Year2024Day23Tests: XCTestCase {
  let day = Year2024.Day23(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 1156)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? String, "bx,cx,dr,dx,is,jg,km,kt,li,lt,nh,uf,um")
  }
}
