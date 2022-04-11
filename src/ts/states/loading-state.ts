import { ImageLookup, SoundLookup, LoadingStateData } from '../types'
import { renderScreen, blinkInstructions } from '../display'
import { BACKSTORY, LOADING } from '../constants'
import { loadImages } from '../images'
import { loadSounds } from '../audio'
import { wait } from '../utils'

class LoadingState {
  state: LoadingStateData
  images: ImageLookup
  sounds: SoundLookup
  audioContext: AudioContext

  async enter (state: LoadingStateData): Promise<void> {
    this.state = state
    this.audioContext = new AudioContext()
    renderScreen(LOADING, state.renderTarget)
    const [images, sounds] = await this.loadAssets(2000)
    this.images = images
    this.sounds = sounds
    blinkInstructions('Press Space')
    this.registerListeners()
  }

  async loadAssets (minDuration: number): Promise<[ImageLookup, SoundLookup]> {
    const [images, sounds, _] = await Promise.all([
      await loadImages(),
      await loadSounds(this.audioContext),
      wait(minDuration)
    ])
    return [images, sounds]
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.state.stateMachine.change(BACKSTORY, {
        ...this.state,
        graphics: {
          images: this.images
        },
        audio: {
          ctx: this.audioContext,
          sounds: this.sounds
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

export { LoadingState }
