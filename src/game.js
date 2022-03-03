import { display } from './display.js'
import { audio } from './audio.js'
import { images } from './images.js'
import { arena } from './arena.js'
import { StateMachine } from './states/state-machine.js'
import { PlayState } from './states/play-state.js'

class Game {
  constructor () {
    this.stateMachine = new StateMachine()
  }

  async init () {
    display.showLoader()
    await audio.init()
    await images.init()
    await arena.init()

    this.stateMachine.register('play', new PlayState())

    display.hide('start-screen')
  }

  switchState (state) {
    this.stateMachine.change(state)
  }

  async start () {
    await this.init()
    this.switchState('play')
  }
}

const game = new Game()

export { game }
