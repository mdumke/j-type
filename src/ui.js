import { arena } from './arena.js'
import { audio } from './audio.js'
import { display } from './display.js'
import { images } from './images.js'
import { PLAYER_WAITING, PLAYER_STRIKING } from './constants.js'

const ui = {
  inputEl: null,

  clearInput () {
    ui.inputEl.value = ''
  },

  hideInput () {
    display.hide('input')
  },

  showInput () {
    display.show('input')
  },

  getInput () {
    return ui.inputEl.value
  },

  focusInput () {
    ui.inputEl.focus()
  },

  renderHeroPowerbar (fraction) {
    display.setWidth(display.getHeroPowerbar(), fraction * 100)
  },

  renderEnemyPowerbar (fraction) {
    display.setWidth(display.getEnemyPowerbar(), fraction * 100)
  },

  renderHeroDefeated () {
    arena.drawImage(images['fighter-defeated'], 40, 160)
  },

  renderEnemyDefeated () {
    arena.drawImage(images['fighter-defeated'], 280, 160, true)
  },

  renderHero (player, state) {
    arena.drawImage(images[`fighter-${player.weapon}-${state}`], 50, 75)
    ui.renderHeroPowerbar(player.health / player.maxHealth)
  },

  renderEnemy (player, state) {
    arena.drawImage(images[`fighter-${player.weapon}-${state}`], 300, 75, true)
    ui.renderEnemyPowerbar(player.health / player.maxHealth)
  },

  renderWaitState (hero, enemy) {
    arena.clear()
    ui.renderHero(hero, PLAYER_WAITING)
    ui.renderEnemy(enemy, PLAYER_WAITING)
  },

  async animateHeroStrike (hero, enemy) {
    arena.clear()
    ui.renderHero(hero, PLAYER_STRIKING)
    ui.renderEnemyPowerbar(enemy.health / enemy.maxHealth)
    await audio.sounds.sfx[hero.weapon].play()
  },

  async animateEnemyStrike (enemy, hero) {
    arena.clear()
    ui.renderEnemy(enemy, PLAYER_STRIKING)
    ui.renderHeroPowerbar(hero.health / hero.maxHealth)
    await audio.sounds.sfx[enemy.weapon].play()
  },

  async animateHeroDefeated (hero, enemy) {
    arena.clear()
    ui.renderHeroDefeated()
    ui.renderEnemy(enemy, PLAYER_WAITING)
  },

  async animateEnemyDefeated (hero, enemy) {
    arena.clear()
    ui.renderHero(hero, PLAYER_WAITING)
    ui.renderEnemyDefeated()
  },

  async init () {
    ui.inputEl = document.querySelector('#input')
  }
}

export { ui }
