const stateMachine = {
  current: null,
  states: {},

  register (key, state) {
    if (key in stateMachine.states) {
      throw new Error(`state name already registered: ${key}`)
    }

    stateMachine.states[key] = state
  },

  change (key) {
    if (stateMachine.current !== null) {
      stateMachine.current.exit()
    }

    stateMachine.current = stateMachine.states[key]
    stateMachine.current.enter()
  }
}

export { stateMachine }
