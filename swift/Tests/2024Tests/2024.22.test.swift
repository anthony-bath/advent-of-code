import XCTest
@testable import AdventOfCode

final class Year2024Day22Tests: XCTestCase {
  let day = Year2024.Day22(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 17_005_483_322)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 1910)
  }
}
