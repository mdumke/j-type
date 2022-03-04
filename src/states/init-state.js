import { State } from './state.js'
import { display } from '../display.js'
import { audio } from '../audio.js'
import { images } from '../images.js'
import { arena } from '../arena.js'
import { ui } from '../ui.js'

class InitState extends State {
  async enter ({ stateMachine }) {
    display.showLoader()
    await audio.init()
    await images.init()
    await arena.init()
    await ui.init()
    stateMachine.change('play', { stateMachine, level: 0 })
  }

  exit () {
    display.hide('start-screen')
  }
}

export { InitState }
