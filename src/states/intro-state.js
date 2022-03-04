import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'
import { levelManager } from '../level-manager.js'

class IntroState extends State {
  constructor () {
    super()
    this.handleKeypress = this.handleKeypress.bind(this)
    this.stateMachine
    this.level
    this.hero
    this.enemy
  }

  enter ({ level, stateMachine }) {
    this.level = level
    this.stateMachine = stateMachine

    display.show('play-screen')
    ui.hideInput()

    this.hero = levelManager.getHero(level)
    this.enemy = levelManager.getEnemy(level)

    ui.renderWaitState(this.hero, this.enemy)
    // display.showTarget(`LEVEL ${level + 1}`, '3rem')
    display.showTarget(levelManager.getLevelSummary(level), '1.5rem')

    ui.showInstructions('Press SPACE')
    this.registerListener()
  }

  async handleKeypress (e) {
    if (e.code !== 'Space') return

    ui.hideInstructions()
    ui.showInput()
    display.showTarget('')

    setTimeout(() => {
      this.stateMachine.change('play', {
        level: this.level,
        hero: this.hero,
        enemy: this.enemy,
        stateMachine: this.stateMachine
      })
    }, 500)
  }

  exit () {
    this.removeListener()
  }

  registerListener () {
    window.addEventListener('keypress', this.handleKeypress)
  }

  removeListener () {
    window.removeEventListener('keypress', this.handleKeypress)
  }
}

export { IntroState }
