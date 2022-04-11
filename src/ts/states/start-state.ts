import { StartStateData } from '../types'
import { renderScreen, blinkInstructions } from '../display'
import { START, LOADING } from '../constants'

class StartState {
  state: StartStateData

  enter (state: StartStateData): void {
    this.state = state
    renderScreen(START, state.renderTarget)
    blinkInstructions('Press Space')
    this.registerListeners()
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.state.stateMachine.change(LOADING, this.state)
    }
  }

  registerListeners (): void {
    document.addEventListener('keypress', this.handleKeypress)
  }

  removeListeners (): void {
    document.removeEventListener('keypress', this.handleKeypress)
  }

  exit (): void {
    this.removeListeners()
  }
}

export { StartState }
