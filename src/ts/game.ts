import { StateMachine } from './states/state-machine'
import { StartState } from './states/start-state'
import { LoadingState } from './states/loading-state'
import { BackstoryState } from './states/backstory-state'
import { RenderTarget } from './types'
import { START, LOADING, BACKSTORY } from './constants'

class Game {
  start (renderTarget: RenderTarget): void {
    const stateMachine = new StateMachine()

    stateMachine.register(START, new StartState())
    stateMachine.register(LOADING, new LoadingState())
    stateMachine.register(BACKSTORY, new BackstoryState())

    stateMachine.change(START, { renderTarget, stateMachine })
  }
}

export { Game }
