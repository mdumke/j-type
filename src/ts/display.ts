import { RenderTarget } from './types'
import { Screen } from './constants'
import { html as titleScreenHTML } from './title-screen'

export const renderScreen = (screen: Screen, target: RenderTarget): void => {
  switch (screen) {
    case Screen.TITLE:
      target.el.innerHTML = titleScreenHTML
      break
    default:
      console.error(`screen "${screen}" not implemented`)
  }
}
