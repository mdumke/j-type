import { State } from './state.js'
import { UniformRandom } from '../agents/uniform-random.js'
import { levelManager } from '../level-manager.js'
import { ui } from '../ui.js'
import { display } from '../display.js'
import { audio } from '../audio.js'
import { Timer } from '../timer.js'

class PlayState extends State {
  constructor () {
    super()
    this.timer = new Timer(this.handleTimeout.bind(this))
    this.evaluateInput = this.evaluateInput.bind(this)
    this.ignoreInput = false
    this.stateMachine
    this.hiragana
    this.agent
    this.target
  }

  enter ({ level, stateMachine }) {
    display.show('play-screen')
    this.stateMachine = stateMachine
    this.hero = levelManager.getHero(level)
    this.enemy = levelManager.getEnemy(level)
    this.hiragana = levelManager.getHiragana(level)
    this.agent = new UniformRandom(this.hiragana)
    this.level = level
    this.selectTarget()
    this.registerListener()
  }

  selectTarget () {
    this.target = this.agent.choose()
    this.ignoreInput = false
    this.timer.start(2500, true)
    display.showTarget(this.target.hiragana)
    ui.clearInput()
    ui.focusInput()
    ui.renderWaitState(this.hero, this.enemy)
  }

  exit () {
    this.removeListener()
  }

  async evaluateInput () {
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
    this.timer.stop()
    this.ignoreInput = true
    this.enemy.hit()
    await Promise.all([
      ui.animateHeroStrike(this.hero, this.enemy),
      audio.playVoiceRecording(this.target.romaji)
    ])
    this.selectTarget()
  }

  async handleError () {
    this.timer.restart()
    this.ignoreInput = true
    this.hero.hit()
    await ui.animateEnemyStrike(this.enemy, this.hero)
    this.ignoreInput = false
    ui.renderWaitState(this.hero, this.enemy)
    ui.clearInput()
  }

  handleContinue () {
    this.timer.restart()
    ui.renderWaitState(this.hero, this.enemy)
  }

  async handleTimeout () {
    this.ignoreInput = true
    this.hero.hit()
    await ui.animateEnemyStrike(this.enemy, this.hero)
    this.ignoreInput = false
    ui.renderWaitState(this.hero, this.enemy)
  }

  registerListener () {
    ui.inputEl.addEventListener('input', this.evaluateInput)
  }

  removeListener () {
    ui.inputEl.removeEventListener('input', this.evaluateInput)
  }
}

export { PlayState }
