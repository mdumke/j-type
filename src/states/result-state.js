import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'
import { statisticsManager } from '../statistics-manager.js'
import { levelManager } from '../level-manager.js'
import { stateMachine } from './state-machine.js'

class ResultState extends State {
  constructor () {
    super()
    this.handleKeypress = this.handleKeypress.bind(this)
    this.nextLevel
    this.hero
  }

  enter ({ hero, enemy, level }) {
    this.nextLevel = level + enemy.isDefeated()
    this.hero = hero
    display.show('play-screen')
    display.unmarkError()
    display.showTarget(
      `<h1>YOU ${enemy.isDefeated() ? 'WIN!' : 'LOSE'}</h1>`,
      '1.5rem'
    )
    ui.hideInput()

    hero.isDefeated()
      ? ui.animateHeroDefeated(enemy)
      : ui.animateEnemyDefeated(hero)

    this.registerListeners()
    ui.showInstructions('Press SPACE')
    console.log(statisticsManager.stats)
  }

  exit () {
    ui.hideInstructions()
  }

  handleKeypress (e) {
    if (e.code !== 'Space') return

    this.removeListeners()

    setTimeout(() => {
      if (this.nextLevel < levelManager.getNumLevels()) {
        stateMachine.change('intro', {
          level: this.nextLevel
        })
      } else {
        stateMachine.change('victory', {
          hero: this.hero
        })
      }
    }, 100)
  }

  registerListeners () {
    document.addEventListener('keypress', this.handleKeypress)
  }

  removeListeners () {
    document.removeEventListener('keypress', this.handleKeypress)
  }
}

export { ResultState }
