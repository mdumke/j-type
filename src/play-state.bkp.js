import { display } from './display.js'
import { audio } from './audio.js'
import { Hiragana } from './hiragana.js'
import { Player } from './player.js'
import { Timer } from './timer.js'

class PlayState {
  constructor () {
    this.hiragana = new Hiragana()
    this.stats = this.prepareStats(this.hiragana.chars)
    this.timer = new Timer(this.handleTimeout.bind(this))
    this.target = null
    this.hero = null
    this.enemy = null
    this.startTime = null
  }

  enter () {
    display.show('play-screen')
    display.focusInput()
    this.hero = new Player({
      health: 10,
      weapon: 'a',
      powerbar: display.getHeroPowerbar(),
      isHero: true
    })
    this.enemy = new Player({
      health: 50,
      weapon: 'b',
      powerbar: display.getEnemyPowerbar(),
      isHero: false
    })
    this.setInputListener()
    this.reset()
  }

  exit () {
    display.hide('play-screen')
  }

  reset () {
    this.target = this.hiragana.sample()
    this.startTime = performance.now()
    this.timer.start(2000, true)
    display.showTarget(this.target.hiragana)
    display.unmarkError()
    display.clearInput()
  }

  gameOver () {
    this.timer.stop()
    console.log('thats it for you buddy...')
    console.log(this.stats)
  }

  levelCleared () {
    this.timer.stop()
    console.log('congrats, lets move on...')
    console.log(this.stats)
  }

  async handleSuccess () {
    this.timer.stop()
    display.clearInput()
    display.unmarkError()
    this.updateStatsWithSuccess(
      this.target.romaji,
      performance.now() - this.startTime
    )
    this.enemy.takeHit()
    await Promise.all([
      audio.playVoiceRecording(this.target.romaji),
      this.playFightSequence(this.hero)
    ])
    if (this.enemy.isDefeated()) {
      this.levelCleared()
    } else {
      this.reset()
    }
  }

  async handleError () {
    this.timer.restart()
    display.markError()
    display.clearInput()
    this.updateStatsWithError(this.target.romaji)
    this.hero.takeHit()
    await this.playFightSequence(this.enemy)
    if (this.hero.isDefeated()) {
      this.gameOver()
    }
  }

  handleWait () {
    this.timer.restart()
    display.unmarkError()
  }

  async handleTimeout () {
    this.hero.takeHit()
    await this.playFightSequence(this.enemy)
    if (this.hero.isDefeated()) {
      this.gameOver()
    }
  }

  async playFightSequence (winner) {
    await Promise.all([winner.hit(), setTimeout(() => {}, 3000)])
    this.hero.reset()
    this.enemy.reset()
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
