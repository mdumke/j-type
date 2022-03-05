import { State } from './state.js'
import { RecencyBased } from '../agents/index.js'
import { levelManager } from '../level-manager.js'
import { statisticsManager } from '../statistics-manager.js'
import { ui } from '../ui.js'
import { display } from '../display.js'
import { audio } from '../audio.js'
import { Timer } from '../timer.js'

class PlayState extends State {
  constructor () {
    super()
    this.timer = new Timer(this.handleTimeout)
    this.ignoreInput = false
    this.stateMachine
    this.hiragana
    this.agent
    this.target
  }

  enter ({ level, hero, enemy, stateMachine }) {
    display.show('play-screen')
    ui.showInput()
    ui.clearInput()
    this.level = level
    this.hero = hero
    this.enemy = enemy
    this.stateMachine = stateMachine
    this.hiragana = levelManager.getHiragana(level)
    this.agent = new RecencyBased(this.hiragana)
    this.selectTarget()
    this.registerListener()
  }

  selectTarget () {
    this.target = this.agent.choose()
    this.ignoreInput = false
    this.startTimer()
    this.timer.measure()
    display.showTarget(this.target.hiragana)
    display.unmarkError()
    ui.clearInput()
    ui.focusInput()
    ui.renderWaitState(this.hero, this.enemy)
  }

  startTimer () {
    this.timer.stop()
    const stats = statisticsManager.get(this.target.romaji)

    if (stats.mean !== null) {
      const dt = stats.mean + 500 + 2000 / (stats.n - stats.errors)
      this.timer.start(dt)
    }
  }

  exit () {
    display.hide('play-screen')
    ui.clearInput()
    this.removeListener()
    this.timer.stop()
  }

  async evaluateInput (e) {
    if (this.ignoreInput) return

    const guess = ui.getInput()
    const goal = this.target.romaji

    if (guess === goal) {
      await this.handleSuccess()
    } else if (guess !== goal.slice(0, guess.length)) {
      await this.handleError()
    } else {
      this.handleContinue()
    }
  }

  async handleSuccess () {
    statisticsManager.observe(this.target.romaji, this.timer.read())
    display.unmarkError()
    this.timer.stop()
    this.ignoreInput = true
    this.enemy.hit()
    await Promise.all([
      ui.animateHeroStrike(this.hero, this.enemy),
      audio.playVoiceRecording(this.target.romaji)
    ])

    if (this.enemy.isDefeated()) {
      return this.stateMachine.change('result', {
        level: this.level,
        hero: this.hero,
        enemy: this.enemy,
        stateMachine: this.stateMachine
      })
    }

    this.selectTarget()
  }

  async handleError () {
    statisticsManager.observe(this.target.romaji, this.timer.read(), true)
    this.timer.restart()
    display.markError()
    this.ignoreInput = true
    this.hero.hit()
    await ui.animateEnemyStrike(this.enemy, this.hero)
    this.ignoreInput = false
    ui.renderWaitState(this.hero, this.enemy)
    ui.clearInput()

    if (this.hero.isDefeated()) {
      this.stateMachine.change('result', {
        level: this.level,
        hero: this.hero,
        enemy: this.enemy,
        stateMachine: this.stateMachine
      })
    }
  }

  handleContinue () {
    this.timer.restart()
    display.unmarkError()
    ui.renderWaitState(this.hero, this.enemy)
  }

  handleTimeout = async () => {
    const inputBefore = ui.getInput()
    this.timer.stop()
    this.ignoreInput = true
    this.hero.hit()
    await ui.animateEnemyStrike(this.enemy, this.hero)
    this.ignoreInput = false
    ui.renderWaitState(this.hero, this.enemy)

    if (this.hero.isDefeated()) {
      return this.stateMachine.change('result', {
        level: this.level,
        hero: this.hero,
        enemy: this.enemy,
        stateMachine: this.stateMachine
      })
    }

    if (inputBefore !== ui.getInput()) {
      this.startTimer()
      this.evaluateInput()
    }
  }

  handleInput = () => {
    audio.sounds.sfx['typing'].play()
    this.evaluateInput()
  }

  registerListener () {
    ui.inputEl.addEventListener('input', this.handleInput)
  }

  removeListener () {
    ui.inputEl.removeEventListener('input', this.handleInput)
  }
}

export { PlayState }
