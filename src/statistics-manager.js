import { HIRAGANA } from './hiragana.js'

class StatisticsManager {
  constructor () {
    this.stats = {}

    // discount rate for the exponential running average
    this.alpha = 0.9
  }

  async init () {
    this.stats = Object.values(HIRAGANA).reduce(
      (memo, romaji) => ({
        ...memo,
        [romaji]: {
          mean: null,
          expRA: null,
          n: 0,
          errors: 0
        }
      }),
      {}
    )
  }

  observe (romaji, dt, isError = false) {
    const { mean, expRA, n, errors } = this.stats[romaji]

    const newMean = mean ? (mean * n) / (n + 1) + dt / (n + 1) : dt
    const newExpRA = expRA ? this.alpha * expRA + (1 - this.alpha) * dt : dt

    this.stats[romaji] = {
      mean: newMean,
      expRA: newExpRA,
      n: n + 1,
      errors: errors + isError
    }
  }

  get (romaji) {
    return { ...this.stats[romaji] }
  }
}

export const statisticsManager = new StatisticsManager()
