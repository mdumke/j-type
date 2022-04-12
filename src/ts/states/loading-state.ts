import { Assets, LoadingStateData } from '../types'
import { renderScreen } from '../display'
import { BACKSTORY, LOADING } from '../constants'
import { loadSprites, loadBackgrounds } from '../images'
import { loadSounds } from '../audio'
import { wait } from '../utils'

class LoadingState {
  async enter (state: LoadingStateData): Promise<void> {
    renderScreen(LOADING, state.renderTarget)
    const assets = await this.loadAssets(100)

    state.stateMachine.change(BACKSTORY, {
      ...state,
      assets
    })
  }

  async loadAssets (minDuration: number): Promise<Assets> {
    const ctx = new AudioContext()
    const [sprites, backgrounds, sounds, _] = await Promise.all([
      await loadSprites(),
      await loadBackgrounds(),
      await loadSounds(ctx),
      wait(minDuration)
    ])

    return {
      audio: {
        ctx,
        sounds
      },
      images: {
        sprites,
        backgrounds
      }
    }
  }

  exit (): void {}
}

export { LoadingState }
