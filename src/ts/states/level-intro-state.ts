import { LevelIntroStateData } from '../types'
import { renderScreen, addBackgroundImage } from '../display'
import { AudioPlayer } from '../audio-player'
import { LEVEL_INTRO } from '../constants'

class LevelIntroState {
  async enter (state: LevelIntroStateData): Promise<void> {
    this.render(state)
    const music = new AudioPlayer(state.assets.audio, 'shamisen')
    await music.play()
    console.log('switching to round 1 intro')
  }

  render (state: LevelIntroStateData) {
    renderScreen(LEVEL_INTRO, state.renderTarget)
    addBackgroundImage(
      state.renderTarget,
      state.assets.images.backgrounds['level-1-intro']!
    )
  }

  exit (): void {}
}

export { LevelIntroState }
