import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'

class ResultState extends State {
  constructor () {
    super()
    this.handleKeypress = this.handleKeypress.bind(this)
    this.stateMachine
    this.nextLevel
    this.hero
  }

  enter ({ hero, enemy, level, stateMachine }) {
    this.stateMachine = stateMachine
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
  }

  exit () {
    ui.hideInstructions()
  }

  handleKeypress (e) {
    if (e.code !== 'Space') return

    this.removeListeners()

    setTimeout(() => {
      if (this.nextLevel < 2) {
        this.stateMachine.change('intro', {
          level: this.nextLevel,
          stateMachine: this.stateMachine
        })
      } else {
        this.stateMachine.change('victory', {
          stateMachine: this.stateMachine,
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
