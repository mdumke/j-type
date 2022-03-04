import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'

class ResultState extends State {
  constructor () {
    super()
    this.handleKeydown = this.handleKeydown.bind(this)
    this.stateMachine
    this.nextLevel
  }

  enter ({ hero, enemy, level, stateMachine }) {
    this.stateMachine = stateMachine
    this.nextLevel = level + enemy.isDefeated()
    display.show('play-screen')
    display.unmarkError()
    display.showTarget(`YOU ${enemy.isDefeated() ? 'WIN' : 'LOSE'}!`, '4rem')
    ui.hideInput()

    hero.isDefeated()
      ? ui.animateHeroDefeated(enemy)
      : ui.animateEnemyDefeated(hero)

    setTimeout(() => {
      this.registerListeners()
      ui.showInstructions('Press SPACE')
    }, 1500)
  }

  handleKeydown (e) {
    if (e.code !== 'Space') return

    ui.hideInstructions()

    setTimeout(() => {
      this.stateMachine.change('intro', {
        level: this.nextLevel,
        stateMachine: this.stateMachine
      })
    }, 1500)
  }

  registerListeners () {
    document.addEventListener('keydown', this.handleKeydown.bind(this), {
      once: true
    })
  }
}

export { ResultState }
