
import XCTest
@testable import AdventOfCode

final class Year2024Day02Tests: XCTestCase {
  let day = Year2024.Day02(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 282)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 349)
  }
}
