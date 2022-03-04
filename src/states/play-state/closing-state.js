import { State } from '../state.js'
import { display } from '../../display.js'

class ClosingState extends State {
  enter ({ stateMachines }) {
    console.log('CLOSING')
  }
}

export { ClosingState }
