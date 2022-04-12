import { BackstoryStateData } from '../types'
import { renderScreen, blinkInstructions, addBackgroundImage } from '../display'
import { AudioPlayer } from '../audio-player'
import { BACKSTORY } from '../constants'

class BackstoryState {
  state: BackstoryStateData
  player: AudioPlayer

  async enter (state: BackstoryStateData): Promise<void> {
    renderScreen(BACKSTORY, state.renderTarget)
    addBackgroundImage(
      state.renderTarget,
      state.assets.images.backgrounds['backstory']!
    )

    this.player = new AudioPlayer(state.assets.audio, 'typing')
    this.player.start()
    this.registerListeners()

    blinkInstructions('Press Space')
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
    this.player.stop()
    this.removeListeners()
  }
}

export { BackstoryState }
