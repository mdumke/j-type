import { TournamentData } from '../types'
import { renderScreen, addBackgroundImage, blinkInstructions } from '../display'
import { ROUND_INTRO } from '../constants'

class RoundIntroState {
  state: TournamentData

  async enter (state: TournamentData): Promise<void> {
    this.state = state
    this.render()
    this.registerListeners()
    blinkInstructions('Press Space')
  }

  render (): void {
    renderScreen(ROUND_INTRO, this.state.renderTarget)
    addBackgroundImage(
      this.state.renderTarget,
      this.state.assets.images.backgrounds['level-1-intro']!
    )
  }

  handleKeypress = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      console.log('changing into play state')
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

export { RoundIntroState }
