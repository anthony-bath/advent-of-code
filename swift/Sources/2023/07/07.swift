import Algorithms

extension Year2023 {
  struct Day07: AdventDay {
    var data: String
    var lines: [String]

    func sortPlayers(_ p1: Year2023.Player, _ p2: Year2023.Player) -> Bool {
      let p1Classification = p1.hand.classification.rawValue
      let p2Classification = p2.hand.classification.rawValue

      if p1Classification > p2Classification {
        return false
      } else if p2Classification > p1Classification {
        return true
      } else {
        for i in 0 ..< 5 {
          let p1Value = p1.hand.cards[i].value
          let p2Value = p2.hand.cards[i].value

          if p1Value > p2Value {
            return false
          } else if p2Value > p1Value {
            return true
          }
        }
        return true
      }
    }

    func calculateWinnings(useJokers: Bool) -> Int {
      let handFactory = Year2023.HandFactory(useJokers: useJokers)
      let playerFactory = Year2023.PlayerFactory(handFactory: handFactory)

      let players = lines.map {
        let components = $0.components(separatedBy: " ")
        let (cardData, bid) = (components[0], components[1])

        return playerFactory.createPlayer(cardData: cardData.map { String($0) }, bid: Int(bid)!)
      }

      return players.sorted(by: sortPlayers).enumerated().reduce(0) { total, playerEnumerated in
        let (index, player) = playerEnumerated

        return total + (index + 1) * player.bid
      }
    }

    func part1() -> Any {
      calculateWinnings(useJokers: false)
    }

    func part2() -> Any {
      calculateWinnings(useJokers: true)
    }
  }
}
