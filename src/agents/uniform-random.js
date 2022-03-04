class UniformRandom {
  constructor (hiragana) {
    this.hiragana = hiragana
    this.current
  }

  choose () {
    while (true) {
      const newTarget = Math.floor(Math.random() * this.hiragana.length)

      if (newTarget !== this.current) {
        this.current = newTarget
        return this.hiragana[this.current]
      }
    }
  }
}

export { UniformRandom }
