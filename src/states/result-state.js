import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'

class ResultState extends State {
  enter ({ hero, enemy, level, stateMachine }) {
    display.show('play-screen')
    display.unmarkError()
    display.showTarget(`YOU ${enemy.isDefeated() ? 'WIN' : 'LOSE'}!`, '4rem')
    ui.hideInput()

    hero.isDefeated()
      ? ui.animateHeroDefeated(hero, enemy)
      : ui.animateEnemyDefeated(enemy, hero)

    setTimeout(() => {
      stateMachine.change('play', {
        level: level + enemy.isDefeated(),
        stateMachine
      })
    }, 5000)
  }

  exit () {
    ui.showInput()
  }
}

export { ResultState }
