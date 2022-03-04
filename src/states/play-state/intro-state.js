import { State } from '../state.js'
import { display } from '../../display.js'

class IntroState extends State {
  async enter ({ level, hero, enemy, hiragana, stateMachines }) {
    hero.render()
    enemy.render()

    await this.showLevel(level)
    // await this.showCountdown()

    stateMachines.playState.change('fight', {
      level,
      hero,
      enemy,
      hiragana,
      stateMachines,
      currentTarget: null
    })
  }

  async showLevel (level) {
    display.showTarget(`Level ${level + 1}`, '5rem')

    return new Promise(res => {
      setTimeout(res, 300)
    })
  }

  async showCountdown () {
    for (let n = 3; n > 0; n--) {
      display.showTarget(n)
      await new Promise(res => setTimeout(res, 1000))
    }
  }
}

export { IntroState }
