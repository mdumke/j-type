import { display } from './display.js'

class Player {
  constructor (health, powerbar) {
    this.health = health
    this.maxHealth = health
    this.powerbar = powerbar
  }

  takeHit () {
    if (this.health <= 0) {
      throw new Error('player is already defated')
    }

    this.health--

    display.setWidth(this.powerbar, (this.health / this.maxHealth) * 100)
  }

  isDefeated () {
    return this.health === 0
  }
}

export { Player }
