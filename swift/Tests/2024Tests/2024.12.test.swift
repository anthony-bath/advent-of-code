import XCTest
@testable import AdventOfCode

final class Year2024Day12Tests: XCTestCase {
  let day = Year2024.Day12(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 1_461_806)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 887_932)
  }
}
