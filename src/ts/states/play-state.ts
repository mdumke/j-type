import { PlayStateData } from '../types'
import { renderScreen, addBackgroundImage } from '../display'
import { PLAY } from '../constants'

class PlayState {
  state: PlayStateData

  async enter (state: PlayStateData): Promise<void> {
    this.state = state
    this.render()
  }

  render (): void {
    renderScreen(PLAY, this.state.renderTarget)
    addBackgroundImage(
      this.state.renderTarget,
      this.state.assets.images.backgrounds[`level-${this.state.game.level}`]!
    )
  }

  exit (): void {}
}

export { PlayState }
