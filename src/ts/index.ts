import { Game } from './game'

const main = (): void => {
  const root = document.querySelector('#game')
  const game = new Game()

  game.start({
    width: 650,
    height: 650,
    el: root as HTMLElement
  })
}

window.addEventListener('DOMContentLoaded', main, { once: true })
