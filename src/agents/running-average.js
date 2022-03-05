import { Agent } from './agent.js'
import { statisticsManager } from '../statistics-manager.js'

class RunningAverage extends Agent {
  choose () {
    const data = this.hiragana.map(entry => ({
      entry,
      expRA: statisticsManager.stats[entry.romaji].expRA
    }))

    console.log(data)

    while (true) {
      const newTarget = Math.floor(Math.random() * this.hiragana.length)

      if (newTarget !== this.current) {
        this.current = newTarget
        return this.hiragana[this.current]
      }
    }
  }
}

export { RunningAverage }
