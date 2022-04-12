import { StateMachine } from './states/state-machine'
import { StartState } from './states/start-state'
import { LoadingState } from './states/loading-state'
import { BackstoryState } from './states/backstory-state'
import { HomeState } from './states/home-state'
import { LevelIntroState } from './states/level-intro-state'
import { RoundIntroState } from './states/round-intro-state'
import { PlayState } from './states/play-state'
import { RenderTarget } from './types'
import {
  START,
  LOADING,
  BACKSTORY,
  HOME,
  LEVEL_INTRO,
  ROUND_INTRO,
  PLAY
} from './constants'

class Game {
  start (renderTarget: RenderTarget): void {
    const stateMachine = new StateMachine()

    stateMachine.register(START, new StartState())
    stateMachine.register(LOADING, new LoadingState())
    stateMachine.register(BACKSTORY, new BackstoryState())
    stateMachine.register(HOME, new HomeState())
    stateMachine.register(LEVEL_INTRO, new LevelIntroState())
    stateMachine.register(ROUND_INTRO, new RoundIntroState())
    stateMachine.register(PLAY, new PlayState())

    stateMachine.change(START, { renderTarget, stateMachine })
  }
}

export { Game }
