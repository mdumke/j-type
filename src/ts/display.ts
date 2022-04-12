import { RenderTarget, Image } from './types'
import { html as startScreenHTML } from './screens/start-screen'
import { html as backstoryScreenHTML } from './screens/backstory-screen'
import { html as homeScreenHTML } from './screens/home-screen'
import { html as levelIntroScreenHTML } from './screens/level-intro-screen'
import { START, BACKSTORY, HOME, LEVEL_INTRO } from './constants'

export const renderScreen = (screen: string, target: RenderTarget): void => {
  target.el.style.width = `${target.width}px`
  target.el.style.height = `${target.height}px`

  switch (screen) {
    case START:
      target.el.innerHTML = startScreenHTML
      break
    case BACKSTORY:
      target.el.innerHTML = backstoryScreenHTML
      break
    case HOME:
      target.el.innerHTML = homeScreenHTML
      break
    case LEVEL_INTRO:
      target.el.innerHTML = levelIntroScreenHTML
      break
    default:
      console.error(`screen "${screen}" not implemented`)
  }
}

const getElement = (elementId: string): HTMLElement => {
  const el = document.querySelector(`#${elementId}`)

  if (el === null) {
    throw new Error('#instructions element not found')
  }

  return el as HTMLElement
}

export const blinkInstructions = (msg: string): void => {
  const el = getElement('instructions')
  el.innerHTML = msg
  el.classList.add('blink')
}

export const addBackgroundImage = (
  target: RenderTarget,
  image: Image
): void => {
  target.el.appendChild(image.img)
}

export const hide = (elementId: string): void => {
  const el = getElement(elementId)
  el.classList.add('hide')
}

export const show = (elementId: string): void => {
  const el = getElement(elementId)
  el.classList.remove('hide')
}
