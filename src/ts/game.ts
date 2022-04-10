import { StateMachine } from './states/state-machine'
import { LoadState } from './states/loading-state'
import { BackstoryState } from './states/backstory-state'
import { RenderTarget } from './types'
import { LOADING, BACKSTORY } from './constants'

class Game {
  start (renderTarget: RenderTarget): void {
    const stateMachine = new StateMachine()

    stateMachine.register(LOADING, new LoadState())
    stateMachine.register(BACKSTORY, new BackstoryState())

    stateMachine.change(LOADING, { renderTarget, stateMachine })
  }
}

export { Game }
