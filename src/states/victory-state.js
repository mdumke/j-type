import { State } from './state.js'
import { display } from '../display.js'
import { ui } from '../ui.js'
import { audio } from '../audio.js'
import { PLAYER_WAITING } from '../constants.js'

class VictoryState extends State {
  constructor () {
    super()
    this.handleKeypress = this.handleKeypress.bind(this)
    this.stateMachine
  }

  enter ({ hero, stateMachine }) {
    this.stateMachine = stateMachine
    this.registerListeners()
    audio.sounds.sfx.koto.play()
    ui.clearArena()
    ui.renderOnlyHero(hero, PLAYER_WAITING)
    display.hide('powerbar-section')
    display.showTarget(
      `
      <h1 class="victory-title">SUBARASHII!</h1>
      <br />
      <div class="victory-message">
        You have learned some Hiragana! Contratulations!!
        There is more to come. But now it's time to rest.
        <br />
        <br />
        Or hit SPACE to play again.
      </div>
    `,
      '1.5rem'
    )
  }

  exit () {
    display.show('powerbar-section')
  }

  handleKeypress (e) {
    if (e.code !== 'Space') return

    this.removeListeners()

    setTimeout(() => {
      this.stateMachine.change('intro', {
        level: 0,
        stateMachine: this.stateMachine
      })
    }, 100)
  }

  registerListeners () {
    document.addEventListener('keypress', this.handleKeypress)
  }

  removeListeners () {
    document.removeEventListener('keypress', this.handleKeypress)
  }
}

export { VictoryState }
