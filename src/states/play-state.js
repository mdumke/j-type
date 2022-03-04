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

  enter ({ level, hero, enemy, stateMachine }) {
    display.show('play-screen')
    ui.showInput()
    this.level = level
    this.hero = hero
    this.enemy = enemy
    this.stateMachine = stateMachine
    this.hiragana = levelManager.getHiragana(level)
    this.agent = new UniformRandom(this.hiragana)
    this.selectTarget()
    this.registerListener()
  }

  selectTarget () {
    this.target = this.agent.choose()
    this.ignoreInput = false
    this.timer.start(2500, true)
    display.showTarget(this.target.hiragana)
    display.unmarkError()
    ui.clearInput()
    ui.focusInput()
    ui.renderWaitState(this.hero, this.enemy)
  }

  exit () {
    display.hide('play-screen')
    this.removeListener()
    this.timer.stop()
  }

  async evaluateInput (e) {
    audio.sounds.sfx['typing'].play()

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

    if (this.enemy.isDefeated()) {
      this.stateMachine.change('result', {
        level: this.level,
        hero: this.hero,
        enemy: this.enemy,
        stateMachine: this.stateMachine
      })
    }
  }

  async handleError () {
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

  async handleTimeout () {
    this.ignoreInput = true
    this.hero.hit()
    await ui.animateEnemyStrike(this.enemy, this.hero)
    this.ignoreInput = false
    ui.renderWaitState(this.hero, this.enemy)

    if (this.hero.isDefeated()) {
      this.stateMachine.change('result', {
        level: this.level,
        hero: this.hero,
        enemy: this.enemy,
        stateMachine: this.stateMachine
      })
    }
  }

  registerListener () {
    ui.inputEl.addEventListener('input', this.evaluateInput)
  }

  removeListener () {
    ui.inputEl.removeEventListener('input', this.evaluateInput)
  }
}

export { PlayState }
