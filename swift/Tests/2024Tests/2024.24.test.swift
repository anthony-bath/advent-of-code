import XCTest
@testable import AdventOfCode

final class Year2024Day24Tests: XCTestCase {
  let day = Year2024.Day24(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 49_430_469_426_918)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? String, "fbq,pbv,qff,qnw,qqp,z16,z23,z36")
  }
}
