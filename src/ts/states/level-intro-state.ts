import { TournamentData } from '../types'
import { renderScreen, addBackgroundImage } from '../display'
import { AudioPlayer } from '../audio-player'
import { LEVEL_INTRO, ROUND_INTRO } from '../constants'

class LevelIntroState {
  async enter (state: TournamentData): Promise<void> {
    this.render(state)
    const music = new AudioPlayer(state.assets.audio, 'typing')
    await music.play()
    state.stateMachine.change(ROUND_INTRO, state)
  }

  render (state: TournamentData): void {
    renderScreen(LEVEL_INTRO, state.renderTarget)
    addBackgroundImage(
      state.renderTarget,
      state.assets.images.backgrounds['level-1-intro']!
    )
  }

  exit (): void {}
}

export { LevelIntroState }
