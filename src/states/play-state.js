import { display } from '../display.js'
import { audio } from '../audio.js'
import { Hiragana } from '../hiragana.js'
import { Player } from '../player.js'

class PlayState {
  constructor () {
    this.hiragana = new Hiragana()
    this.stats = this.prepareStats(this.hiragana.chars)
    this.target = null
    this.hero = null
    this.enemy = null
    this.startTime = null
    this.interval = null
  }

  enter () {
    display.show('play-screen')
    display.showWallpaper()
    display.focusInput()
    this.hero = new Player(10, display.getHeroPowerbar())
    this.enemy = new Player(10, display.getEnemyPowerbar())
    this.setInputListener()
    this.reset()
  }

  exit () {
    display.hide('play-screen')
    display.hideWallpaper()
  }

  reset () {
    this.target = this.hiragana.sample()
    this.startTime = performance.now()
    this.interval = setInterval(() => this.handleTimeout(), 2000)
    display.showTarget(this.target.hiragana)
    display.unmarkError()
    display.clearInput()
  }

  gameOver () {
    clearInterval(this.interval)
    console.log('thats it for you buddy...')
  }

  levelCleared () {
    console.log('congrats, lets move on...')
  }

  async handleSuccess () {
    clearInterval(this.interval)
    display.clearInput()
    display.unmarkError()
    this.updateStatsWithSuccess(
      this.target.romaji,
      performance.now() - this.startTime
    )
    console.log(this.stats)
    await audio.playVoiceRecording(this.target.romaji)
    this.enemy.takeHit()
    if (this.enemy.isDefeated()) {
      this.levelCleared()
    } else {
      this.reset()
    }
  }

  handleError () {
    display.markError()
    display.clearInput()
    this.updateStatsWithError(this.target.romaji)
    this.hero.takeHit()
    if (this.hero.isDefeated()) {
      this.gameOver()
    }
  }

  handleWait () {
    display.unmarkError()
  }

  handleTimeout () {
    this.hero.takeHit()
    if (this.hero.isDefeated()) {
      this.gameOver()
    }
  }

  step () {
    const guess = this.getInput()
    const goal = this.target.romaji

    if (guess === goal) {
      this.handleSuccess()
    } else if (guess !== goal.slice(0, guess.length)) {
      this.handleError()
    } else {
      this.handleWait()
    }
  }

  getInput () {
    return document.querySelector('#input').value
  }

  setInputListener () {
    document
      .querySelector('#input')
      .addEventListener('input', this.step.bind(this))
  }

  prepareStats (hiragana) {
    return hiragana
      .map(([, romaji]) => romaji)
      .reduce(
        (memo, chars) => ({
          ...memo,
          [chars]: {
            mean: null,
            n: 0,
            errors: 0
          }
        }),
        {}
      )
  }

  updateStatsWithSuccess (char, dt) {
    const { mean, n, errors } = this.stats[char]

    if (n === null) {
      this.stats[char] = {
        mean: dt,
        n: 1,
        errors
      }
    } else {
      this.stats[char] = {
        mean: (mean * n) / (n + 1) + dt / (n + 1),
        n: n + 1,
        errors
      }
    }
  }

  updateStatsWithError (char) {
    this.stats[char].errors++
  }
}

export { PlayState }
