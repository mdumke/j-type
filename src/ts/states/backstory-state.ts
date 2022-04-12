import { BackstoryStateData } from '../types'
import { renderScreen, blinkInstructions, addBackgroundImage } from '../display'
import { BACKSTORY } from '../constants'

class BackstoryState {
  state: BackstoryStateData

  async enter (state: BackstoryStateData): Promise<void> {
    renderScreen(BACKSTORY, state.renderTarget)
    addBackgroundImage(
      state.renderTarget,
      state.assets.images.backgrounds['backstory']!
    )
    blinkInstructions('Press Space')
    this.registerListeners()
    console.log(state)
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
