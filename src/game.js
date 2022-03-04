import { StateMachine } from './states/state-machine.js'
import { InitState } from './states/init-state.js'
import { IntroState } from './states/intro-state.js'
import { PlayState } from './states/play-state.js'
import { ResultState } from './states/result-state.js'

class Game {
  constructor () {
    this.stateMachine = new StateMachine()
  }

  start () {
    this.stateMachine.register('init', new InitState())
    this.stateMachine.register('intro', new IntroState())
    this.stateMachine.register('play', new PlayState())
    this.stateMachine.register('result', new ResultState())
    this.stateMachine.change('init', {
      stateMachine: this.stateMachine
    })
  }
}

export { Game }
