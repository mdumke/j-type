import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'

class ResultState extends State {
  enter ({ win, level, stateMachine }) {
    display.show('play-screen')
    display.unmarkError()
    display.showTarget(`YOU ${win ? 'WIN' : 'LOSE'}!`, '4rem')
    ui.hideInput()

    setTimeout(() => {
      stateMachine.change('play', {
        level: level + win,
        stateMachine
      })
    }, 5000)
  }
}

export { ResultState }
