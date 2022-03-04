import { StateMachine } from '../state-machine.js'
import { State } from '../state.js'
import { IntroState } from './intro-state.js'
import { FightState } from './fight-state.js'
import { SuccessState } from './success-state.js'
import { ErrorState } from './error-state.js'
import { ClosingState } from './closing-state.js'
import { display } from '../../display.js'
import { levelManager } from '../../level-manager.js'

class PlayState extends State {
  constructor () {
    super()
    this.stateMachine = new StateMachine()
    this.registerSubStates()
  }

  enter ({ level, gameStateMachine }) {
    display.show('play-screen')
    this.stateMachine.change('intro', {
      level,
      hero: levelManager.getHero(level),
      enemy: levelManager.getEnemy(level),
      hiragana: levelManager.getHiragana(level),
      stateMachines: {
        playState: this.stateMachine,
        gameState: gameStateMachine
      }
    })
  }

  exit () {
    display.hide('play-screen')
  }

  registerSubStates () {
    this.stateMachine.register('intro', new IntroState())
    this.stateMachine.register('fight', new FightState())
    this.stateMachine.register('success', new SuccessState())
    this.stateMachine.register('error', new ErrorState())
    this.stateMachine.register('closing', new ClosingState())
  }
}

export { PlayState }
