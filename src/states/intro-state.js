import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'
import { levelManager } from '../level-manager.js'

class IntroState extends State {
  constructor () {
    super()
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

    setTimeout(() => {
      ui.showInstructions('Press SPACE')
      this.registerListener()
    }, 1500)
  }

  async handleKeydown (e) {
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
    }, 1500)
  }

  registerListener () {
    window.addEventListener('keydown', this.handleKeydown.bind(this), {
      once: true
    })
  }
}

export { IntroState }
