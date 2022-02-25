import { display } from '../display.js'
import { audio } from '../audio.js'
import { Hiragana } from '../hiragana.js'
import { Player } from '../player.js'

class PlayState {
  constructor () {
    this.hiragana = new Hiragana()
    this.hero = null
    this.enemy = null
  }

  enter () {
    display.show('play-screen')
    display.showWallpaper()
    display.focusInput()
    this.hero = new Player(3, display.getHeroPowerbar())
    this.enemy = new Player(3, display.getEnemyPowerbar())
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
    display.unmarkError()
    display.clearInput()
  }

  gameOver () {
    console.log('thats it for you buddy...')
  }

  levelCleared () {
    console.log('congrats, lets move on...')
  }

  async handleSuccess () {
    display.clearInput()
    display.unmarkError()
    await audio.playVoiceRecording(this.target.romaji)
    this.enemy.takeHit()
    if (this.enemy.isDefeated()) {
      this.levelCleared()
    } else {
      this.reset()
    }
  }

  handleError () {
    display.markError()
    display.clearInput()
    this.hero.takeHit()
    if (this.hero.isDefeated()) {
      this.gameOver()
    }
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
