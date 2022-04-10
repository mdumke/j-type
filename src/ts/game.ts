import { StateMachine } from './states/state-machine'
import { LoadState } from './states/load-state'
import { RenderTarget } from './types'

class Game {
  start (renderTarget: RenderTarget): void {
    const stateMachine = new StateMachine()
    stateMachine.register('load', new LoadState())
    stateMachine.change('load', { renderTarget })
  }
}

export { Game }
