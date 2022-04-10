import { LoadState } from './states/load-state'

export type State = LoadState

export interface RenderTarget {
  width: number
  height: number
  el: HTMLElement
}

export interface LoadStateData {
  renderTarget: RenderTarget
}

export type StateData = LoadStateData
