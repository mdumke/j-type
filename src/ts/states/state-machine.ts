import { State, StateData } from '../types'

class StateMachine {
  currentState: State | null = null
  states = {}

  register (key: string, state: State): void {
    if (key in this.states) {
      throw new Error(`state "${key}" already registered`)
    }

    this.states[key] = state
  }

  change (key: string, data: StateData): void {
    if (!(key in this.states)) {
      throw new Error(`state ${key} not registered`)
    }

    if (this.currentState !== null) {
      this.currentState.exit()
    }

    this.currentState = this.states[key]!
    this.currentState!.enter(data)
  }
}

export { StateMachine }
