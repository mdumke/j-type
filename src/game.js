import { display } from './display.js'
import { audio } from './audio.js'
import { images } from './images.js'
import { arena } from './arena.js'
import { stateMachine } from './states/state-machine.js'
import { PlayState } from './states/play-state.js'

class Game {
  run () {
    stateMachine.change('play')
  }

  async init () {
    display.showLoader()
    await audio.init()
    await images.init()
    await arena.init()

    stateMachine.register('play', new PlayState())

    display.hide('start-screen')
  }

  static async start () {
    const game = new Game()
    await game.init()
    game.run()
  }
}

export { Game }
