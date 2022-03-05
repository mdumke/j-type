class Agent {
  constructor (hiragana) {
    this.hiragana = hiragana
    this.current
  }

  choose () {
    throw new Error('choose must be implemented in subclass')
  }
}

export { Agent }
