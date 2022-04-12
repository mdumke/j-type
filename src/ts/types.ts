import { StateMachine } from './states/state-machine'
import { StartState } from './states/start-state'
import { LoadingState } from './states/loading-state'
import { BackstoryState } from './states/backstory-state'
import { HomeState } from './states/home-state'
import { LevelIntroState } from './states/level-intro-state'

export interface Image {
  name: string
  img: HTMLImageElement
}

export interface ImageLookup {
  [key: string]: Image
}

export interface Sound {
  name: string
  buffer: AudioBuffer
}

export interface SoundLookup {
  [key: string]: Sound
}

export interface RenderTarget {
  width: number
  height: number
  el: HTMLElement
}

export interface AudioAssets {
  ctx: AudioContext
  sounds: SoundLookup
}

export interface ImageAssets {
  sprites: ImageLookup
  backgrounds: ImageLookup
}

export interface Assets {
  audio: AudioAssets
  images: ImageAssets
}

export interface LevelInfo {
  number: number
}

export interface StartStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
}

export interface LoadingStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
}

export interface BackstoryStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
  assets: Assets
}

export interface HomeStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
  assets: Assets
}

export interface LevelIntroStateData {
  renderTarget: RenderTarget
  stateMachine: StateMachine
  assets: Assets
  level: LevelInfo
}

export type State =
  | StartState
  | LoadingState
  | BackstoryState
  | HomeState
  | LevelIntroState

export type StateData =
  | StartStateData
  | LoadingStateData
  | BackstoryStateData
  | HomeStateData
  | LevelIntroStateData
