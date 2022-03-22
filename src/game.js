import { stateMachine } from './states/state-machine.js'
import { InitState } from './states/init-state.js'
import { IntroState } from './states/intro-state.js'
import { PlayState } from './states/play-state.js'
import { ResultState } from './states/result-state.js'
import { VictoryState } from './states/victory-state.js'

class Game {
  start () {
    stateMachine.register('init', new InitState())
    stateMachine.register('intro', new IntroState())
    stateMachine.register('play', new PlayState())
    stateMachine.register('result', new ResultState())
    stateMachine.register('victory', new VictoryState())

    stateMachine.change('init')
  }
}

export { Game }
