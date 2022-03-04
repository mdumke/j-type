class Player {
  constructor ({ health, weapon }) {
    this.maxHealth = health
    this.health = health
    this.weapon = weapon
  }

  hit () {
    if (this.isDefeated()) {
      throw new Error('player is already defated')
    }

    this.health--
  }

  isDefeated () {
    return this.health <= 0
  }
}

export { Player }
