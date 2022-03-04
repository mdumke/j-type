import { State } from '../state.js'

class ErrorState extends State {
  enter ({ level, hero, enemy, hiragana, currentTarget, stateMachines }) {
    console.log('Wrong!')

    setTimeout(() => {
      stateMachines.playState.change('fight', {
        level,
        hero,
        enemy,
        hiragana,
        currentTarget,
        stateMachines
      })
    }, 1500)
  }
}

export { ErrorState }
