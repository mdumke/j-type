import { State } from './state.js'
import { display } from '../display.js'
import { audio } from '../audio.js'
import { images } from '../images.js'
import { arena } from '../arena.js'
import { ui } from '../ui.js'
import { statisticsManager } from '../statistics-manager.js'
import { stateMachine } from './state-machine.js'

class InitState extends State {
  async enter () {
    display.show('start-screen')
    display.showLoader()
    await audio.init()
    await images.init()
    await arena.init()
    await ui.init()
    await statisticsManager.init()
    stateMachine.change('intro', { level: 0 })
  }

  exit () {
    display.hide('start-screen')
    display.hideLoader()
    audio.sounds.sfx.shamisen.play()
  }
}

export { InitState }
