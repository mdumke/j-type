import { Game } from './game.js'

const main = async () => {
  document.querySelector('#start-screen').addEventListener(
    'click',
    async () => {
      new Game().start()
    },
    { once: true }
  )
}

document.addEventListener('DOMContentLoaded', main, { once: true })
