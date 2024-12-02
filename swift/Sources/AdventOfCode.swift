import ArgumentParser

let allChallenges: [any AdventYear] = [
  Year2023(),
]

@main
struct AdventOfCode: AsyncParsableCommand {
  @Argument(help: "The year of the challenge. For 2023, use '2023'.")
  var year: Int

  @Argument(help: "The day of the challenge. For December 1st, use '1'.")
  var day: Int

  @Flag(help: "Benchmark the time taken by the solution")
  var benchmark: Bool = false

  var selectedChallenge: any AdventDay {
    allChallenges.first(where: { $0.year == year })!.days.first(where: { $0.day == day })!
  }

  func run<T>(part: () async throws -> T, named: String) async -> Duration {
    var result: Result<T, Error>?
    let timing = await ContinuousClock().measure {
      do {
        result = try .success(await part())
      } catch {
        result = .failure(error)
      }
    }
    switch result! {
    case let .success(success):
      print("\(named): \(success)")
    case let .failure(failure as PartUnimplemented):
      print("Day \(failure.day) part \(failure.part) unimplemented")
    case let .failure(failure):
      print("\(named): Failed with error: \(failure)")
    }
    return timing
  }

  func run() async throws {
    let challenges = [selectedChallenge]

    for challenge in challenges {
      print("Executing Advent of Code challenge \(challenge.day)...")

      let timing1: Duration = await run(part: challenge.part1, named: "Part 1")
      let timing2: Duration = await run(part: challenge.part2, named: "Part 2")

      if benchmark {
        print("Part 1 took \(timing1), part 2 took \(timing2).")
        #if DEBUG
          print("Looks like you're benchmarking debug code. Try swift run -c release")
        #endif
      }
    }
  }

  // static func main() {
  //   print("Hello, \(Math.gcd([5, 3]))")
  // }
}
