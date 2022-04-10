import { Image, LoadingStateData } from '../types'
import { renderScreen, blinkInstructions } from '../display'
import { BACKSTORY, LOADING } from '../constants'
import { loadImages } from '../images'
import { wait } from '../utils'

class LoadState {
  state: LoadingStateData
  images: Image[]

  async enter (state: LoadingStateData): Promise<void> {
    this.state = state
    renderScreen(LOADING, state.renderTarget)
    this.images = await this.loadImages(2000)
    blinkInstructions('Press Space')
    this.registerListeners()
  }

  async loadImages (minWaitDuration: number): Promise<Image[]> {
    const [images, _] = await Promise.all([
      await loadImages(),
      wait(minWaitDuration)
    ])
    return images
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.state.stateMachine.change(BACKSTORY, {
        ...this.state,
        assets: {
          images: this.images
        }
      })
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

export { LoadState }
