import { Game } from './game.js'

const handleKeydown = e => {
  if (e.code !== 'Space') return

  new Game().start()
  window.removeEventListener('keydown', handleKeydown)
}

const main = async () => {
  window.addEventListener('keydown', handleKeydown)
}

document.addEventListener('DOMContentLoaded', main, { once: true })
