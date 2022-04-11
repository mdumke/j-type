import { BackstoryStateData } from '../types'
import { renderScreen, blinkInstructions } from '../display'
import { BACKSTORY } from '../constants'

class BackstoryState {
  state: BackstoryStateData

  async enter (state: BackstoryStateData): Promise<void> {
    console.log(state)
    renderScreen(BACKSTORY, state.renderTarget)
    blinkInstructions('Press Space')
    this.registerListeners()
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      console.log('switching to home screen')
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

export { BackstoryState }
