import { StateMachine } from './states/state-machine'
import { LoadState } from './states/loading-state'
import { BackstoryState } from './states/backstory-state'

export type State = LoadState | BackstoryState

export interface Image {
  name: string
  el: HTMLImageElement
}

export interface RenderTarget {
  width: number
  height: number
  el: HTMLElement
}

export interface LoadingStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
}

export interface BackstoryStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
  assets: {
    images: Image[]
  }
}

export type StateData = LoadingStateData | BackstoryStateData
