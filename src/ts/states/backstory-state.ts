import { BackstoryStateData } from '../types'
import { renderScreen, blinkInstructions, addBackgroundImage } from '../display'
import { AudioPlayer } from '../audio-player'
import { BACKSTORY, HOME } from '../constants'

class BackstoryState {
  state: BackstoryStateData
  music: AudioPlayer

  async enter (state: BackstoryStateData): Promise<void> {
    this.state = state
    this.render()
    this.music = new AudioPlayer(state.assets.audio, 'typing')
    this.music.start()
    this.registerListeners()
    blinkInstructions('Press Space to Skip')
  }

  render () {
    renderScreen(BACKSTORY, this.state.renderTarget)
    addBackgroundImage(
      this.state.renderTarget,
      this.state.assets.images.backgrounds['backstory']!
    )
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.state.stateMachine.change(HOME, { ...this.state })
    }
  }

  registerListeners (): void {
    document.addEventListener('keypress', this.handleKeypress)
  }

  removeListeners (): void {
    document.removeEventListener('keypress', this.handleKeypress)
  }

  exit (): void {
    this.music.stop()
    this.removeListeners()
  }
}

export { BackstoryState }
