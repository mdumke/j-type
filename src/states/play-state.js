import { display } from '../display.js'
import { audio } from '../audio.js'
import { Hiragana } from '../hiragana.js'

class PlayState {
  constructor () {
    this.hiragana = new Hiragana()
  }

  enter () {
    display.show('play-screen')
    display.showWallpaper()
    display.focusInput()
    this.setInputListener()
    this.reset()
  }

  exit () {
    display.hide('play-screen')
    display.hideWallpaper()
  }

  reset () {
    this.target = this.hiragana.sample()
    display.showTarget(this.target.hiragana)
    display.clearInput()
  }

  handleSuccess () {
    display.unmarkError()
    audio.playVoiceRecording(this.target.romaji)
    setTimeout(this.reset.bind(this), 800)
  }

  handleError () {
    display.markError()
  }

  handleWait () {
    display.unmarkError()
  }

  step () {
    const guess = this.getInput()
    const goal = this.target.romaji

    if (guess === goal) {
      this.handleSuccess()
    } else if (guess !== goal.slice(0, guess.length)) {
      this.handleError()
    } else {
      this.handleWait()
    }
  }

  getInput () {
    return document.querySelector('#input').value
  }

  setInputListener () {
    document
      .querySelector('#input')
      .addEventListener('input', this.step.bind(this))
  }
}

export { PlayState }
