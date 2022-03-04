import { State } from '../state.js'

class SuccessState extends State {
  enter ({ level, hero, enemy, hiragana, stateMachines }) {
    console.log('Success!')

    setTimeout(() => {
      stateMachines.playState.change('fight', {
        level,
        hero,
        enemy,
        hiragana,
        currentTarget: null,
        stateMachines
      })
    }, 1500)
  }
}

export { SuccessState }
