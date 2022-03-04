import { State } from '../state.js'
import { UniformRandom } from '../../agents/uniform-random.js'
import { display } from '../../display.js'

class FightState extends State {
  constructor () {
    super()
    this.handleInput = this.handleInput.bind(this)
    this.agent = new UniformRandom()
    this.level
    this.hero
    this.enemy
    this.hiragana
    this.stateMachines
    this.input = ''
  }

  enter ({ level, hero, enemy, hiragana, currentTarget, stateMachines }) {
    this.level = level
    this.hero = hero
    this.enemy = enemy
    this.hiragana = hiragana
    this.stateMachines = stateMachines
    this.target = currentTarget || this.agent.choose(hiragana)
    this.registerListener()
    this.run()

    // stateMachines.playState.change('closing', { stateMachines })
  }

  exit () {
    this.removeListener()
  }

  run () {
    this.setInput(this.input)
    display.showTarget(this.target.hiragana)
    display.focusInput()
  }

  handleInput () {
    const guess = this.getInput()
    const goal = this.target.romaji

    if (guess === goal) {
      this.handleSuccess()
    } else if (guess !== goal.slice(0, guess.length)) {
      this.handleError()
    } else {
      this.handleContinue()
    }
  }

  handleSuccess () {
    this.stateMachines.playState.change('success', {
      level: this.level,
      hero: this.hero,
      enemy: this.enemy,
      hiragana: this.hiragana,
      stateMachines: this.stateMachines
    })
  }

  handleError () {
    this.stateMachines.playState.change('error', {
      level: this.level,
      hero: this.hero,
      enemy: this.enemy,
      hiragana: this.hiragana,
      currentTarget: this.target,
      stateMachines: this.stateMachines
    })
  }

  handleContinue () {
    console.log('Looks good, go on...')
  }

  registerListener () {
    document.querySelector('#input').addEventListener('input', this.handleInput)
  }

  removeListener () {
    document
      .querySelector('#input')
      .removeEventListener('input', this.handleInput)
  }

  getInput () {
    return document.querySelector('#input').value
  }

  setInput (value) {
    this.input = value
    document.querySelector('#input').value = value
  }
}

export { FightState }
