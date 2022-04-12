import { HomeStateData } from '../types'
import { renderScreen, addBackgroundImage, blinkInstructions } from '../display'
import { AudioPlayer } from '../audio-player'
import { HOME, LEVEL_INTRO } from '../constants'

class HomeState {
  state: HomeStateData
  player: AudioPlayer

  async enter (state: HomeStateData): Promise<void> {
    this.state = state
    this.render()
    this.player = new AudioPlayer(state.assets.audio, 'typing')
    this.player.start()
    this.registerListeners()
    blinkInstructions('Press Space to Start')
  }

  render () {
    renderScreen(HOME, this.state.renderTarget)
    addBackgroundImage(
      this.state.renderTarget,
      this.state.assets.images.backgrounds['home']!
    )
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.state.stateMachine.change(LEVEL_INTRO, {
        ...this.state,
        game: {
          level: 1,
          lives: 9,
          round: 1
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
    this.player.stop()
    this.removeListeners()
  }
}

export { HomeState }
