import { StateMachine } from './states/state-machine.js'
import { PlayState } from './states/play-state.js'
import { InitState } from './states/init-state.js'

class Game {
  constructor () {
    this.stateMachine = new StateMachine()
  }

  start () {
    this.stateMachine.register('play', new PlayState())
    this.stateMachine.register('init', new InitState())
    this.stateMachine.change('init', {
      stateMachine: this.stateMachine
    })
  }
}

export { Game }
