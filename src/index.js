import { game } from './game.js'

const main = async () => {
  document.querySelector('#start-screen').addEventListener(
    'click',
    async () => {
      game.start()
    },
    { once: true }
  )
}

document.addEventListener('DOMContentLoaded', main, { once: true })
