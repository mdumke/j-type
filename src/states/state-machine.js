class StateMachine {
  constructor () {
    this.current = null
    this.states = {}
  }

  register (key, state) {
    if (key in this.states) {
      throw new Error(`state name already registered: ${key}`)
    }

    this.states[key] = state
  }

  change (key) {
    if (this.current !== null) {
      this.current.exit()
    }

    this.current = this.states[key]
    this.current.enter()
  }
}

export { StateMachine }
