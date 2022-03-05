import { Agent } from './agent.js'
import { sample } from '../utils.js'
import { statisticsManager as stats } from '../statistics-manager.js'

class RecencyBased extends Agent {
  constructor (hiragana) {
    super(hiragana)
    this.current
  }

  // returns a random hiragana from the ones that have been seen the least
  choose () {
    let leastSeen = []
    let minCount = Infinity
    let count

    for (let entry of this.hiragana) {
      if (entry.romaji === this.current) continue

      const { n, errors } = stats.get(entry.romaji)
      count = Math.max(n - 2 * errors, 0)

      if (count === minCount) {
        leastSeen.push(entry)
      } else if (count < minCount) {
        minCount = count
        leastSeen = [entry]
      }
    }

    const entry = sample(leastSeen)
    this.current = entry.romaji
    return entry
  }
}

export { RecencyBased }
