import { State } from './state.js'
import { ui } from '../ui.js'
import { display } from '../display.js'
import { audio } from '../audio.js'
import { levelManager } from '../level-manager.js'
import { RecencyBased } from '../agents/index.js'
import { statisticsManager as stats } from '../statistics-manager.js'

const MATCH = 'match'
const PARTIAL_MATCH = 'partial-match'
const NO_MATCH = 'no-match'

class PlayState extends State {
  constructor () {
    super()
    this.timeout
    this.startTime
    this.agent
    this.target
    this.level
    this.hero
    this.enemy
    this.stateMachine
    this.ignoreInput
  }

  enter ({ level, hero, enemy, stateMachine }) {
    this.agent = new RecencyBased(levelManager.getHiragana(level))
    this.level = level
    this.hero = hero
    this.enemy = enemy
    this.stateMachine = stateMachine
    this.registerListener()
    this.newRound()
  }

  exit () {
    ui.clearInput()
  }

  newRound () {
    this.target = this.agent.choose()
    ui.showTarget(this.target.hiragana)
    this.startTime = performance.now()
    this.wait()
  }

  wait () {
    this.ignoreInput = false
    display.unmarkError()
    ui.clearInput()
    ui.focusInput()
    ui.renderWaitState(this.hero, this.enemy)
    this.setTimer()
  }

  setTimer () {
    this.timeout && clearTimeout(this.timeout)
    const { mean, n, errors } = stats.get(this.target.romaji)
    if (mean !== null) {
      const dt = mean + 300 + 2000 / (n - errors + 1)
      this.timeout = setTimeout(() => {
        this.handleEnemyStrike()
      }, dt)
    }
  }

  evaluateInput () {
    const guess = ui.getInput()
    const goal = this.target.romaji

    if (guess === goal) return MATCH

    return guess.length < goal.length && guess === goal.slice(0, guess.length)
      ? PARTIAL_MATCH
      : NO_MATCH
  }

  leave () {
    this.timeout && clearTimeout(this.timeout)
    this.stateMachine.change('result', {
      level: this.level,
      hero: this.hero,
      enemy: this.enemy,
      stateMachine: this.stateMachine
    })
  }

  async handleMatch () {
    clearTimeout(this.timeout)
    stats.observe(this.target.romaji, performance.now() - this.startTime)
    this.ignoreInput = true
    this.enemy.hit()
    await Promise.all([
      ui.animateHeroStrike(this.hero, this.enemy),
      audio.playVoiceRecording(this.target.romaji)
    ])
    this.enemy.isDefeated() ? this.leave() : this.newRound()
  }

  handleError () {
    stats.observe(this.target.romaji, performance.now(), true)
    display.markError()
    this.handleEnemyStrike()
  }

  handleEnemyStrike = async () => {
    this.ignoreInput = true
    this.hero.hit()
    await ui.animateEnemyStrike(this.enemy, this.hero)
    this.hero.isDefeated() ? this.leave() : this.wait()
  }

  handlePartialMatch () {
    this.setTimer()
  }

  handleInput = () => {
    audio.sounds.sfx.typing.play()

    if (this.ignoreInput || !ui.getInput()) return

    switch (this.evaluateInput()) {
      case MATCH:
        return this.handleMatch()
      case PARTIAL_MATCH:
        return this.handlePartialMatch()
      case NO_MATCH:
        return this.handleError()
    }
  }

  registerListener () {
    ui.inputEl.addEventListener('input', this.handleInput)
  }

  removeListener () {
    ui.inputEl.removeEventListener('input', this.handleInput)
  }
}

export { PlayState }
