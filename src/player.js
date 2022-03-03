import { display } from './display.js'
import { arena } from './arena.js'
import { images } from './images.js'
import { audio } from './audio.js'

const READY = 'ready'
const HIT = 'hit'

class Player {
  constructor ({ health, powerbar, weapon, isHero }) {
    this.health = health
    this.maxHealth = health
    this.powerbar = powerbar
    this.weapon = weapon
    this.isHero = isHero
    this.render(READY)
  }

  render (state) {
    const x = this.isHero ? 50 : 300
    const y = 75
    const { img, offsetX, offsetY } = this.getImage(state)
    arena.drawImage(img, x + offsetX, y + offsetY, !this.isHero)
  }

  reset () {
    this.render(READY)
  }

  async hit () {
    if (this.health <= 0) {
      throw new Error('player is already defated')
    }

    arena.clear()
    this.render(HIT)

    await audio.sounds.sfx[this.weapon === 'a' ? 'sword' : 'knive'].play()
    arena.clear()
  }

  takeHit () {
    if (this.health <= 0) {
      throw new Error('player is already defated')
    }

    this.health--

    display.setWidth(this.powerbar, (this.health / this.maxHealth) * 100)
  }

  getImage (state) {
    if (state === READY) {
      switch (this.weapon) {
        case 'a':
          return { img: images.fighterA1, offsetX: 0, offsetY: 0 }
        case 'b':
          return { img: images.fighterB1, offsetX: 0, offsetY: 25 }
        default:
          throw new Error(`unknown weapon ${this.weapon}`)
      }
    }

    if (state === HIT) {
      switch (this.weapon) {
        case 'a':
          return { img: images.fighterA2, offsetX: 0, offsetY: 0 }
        case 'b':
          return { img: images.fighterB2, offsetX: -250, offsetY: -15 }
        default:
          throw new Error(`unknown weapon ${this.weapon}`)
      }
    }

    throw new Error(`unknown state ${state}`)
  }

  isDefeated () {
    return this.health === 0
  }
}

export { Player }
