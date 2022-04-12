import { Assets, LoadingStateData } from '../types'
import { hide, show } from '../display'
import { BACKSTORY } from '../constants'
import { loadSprites, loadBackgrounds } from '../images'
import { loadSounds } from '../audio'
import { wait } from '../utils'

class LoadingState {
  async enter (state: LoadingStateData): Promise<void> {
    hide('instructions')
    show('loader')
    const assets = await this.loadAssets(50)

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
