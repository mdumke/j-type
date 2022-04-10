import { RenderTarget } from './types'
import { LOADING, BACKSTORY } from './constants'
import { html as loadingScreenHTML } from './screens/loading-screen'
import { html as backstoryScreenHTML } from './screens/backstory-screen'

export const renderScreen = (screen: string, target: RenderTarget): void => {
  target.el.style.width = `${target.width}px`
  target.el.style.height = `${target.height}px`

  switch (screen) {
    case LOADING:
      target.el.innerHTML = loadingScreenHTML
      break
    case BACKSTORY:
      target.el.innerHTML = backstoryScreenHTML
      break
    default:
      console.error(`screen "${screen}" not implemented`)
  }
}

export const blinkInstructions = (msg: string): void => {
  const el = document.querySelector('#instructions')

  if (el === null) {
    throw new Error('#instructions element not found')
  }

  el.innerHTML = msg
  el.classList.add('blink')
}
