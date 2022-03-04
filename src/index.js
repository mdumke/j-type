import { Game } from './game.js'

const main = async () => {
  window.addEventListener(
    'keydown',
    async () => {
      new Game().start()
    },
    { once: true }
  )
}

document.addEventListener('DOMContentLoaded', main, { once: true })
