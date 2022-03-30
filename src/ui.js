import { arena } from './arena.js'
import { audio } from './audio.js'
import { display } from './display.js'
import { images } from './images.js'

const ui = {
  inputEl: null,
  instructionsEl: null,

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

  showTarget (text, size = '13rem') {
    display.showTarget(text, size)
  },

  showInstructions (text) {
    display.show('instructions')
    ui.instructionsEl.innerHTML = text
    ui.instructionsEl.classList.remove('blink')
  },

  blinkInstructions (text) {
    display.show('instructions')
    ui.instructionsEl.innerHTML = text
    ui.instructionsEl.classList.add('blink')
  },

  hideInstructions () {
    display.hide('instructions')
  },

  renderHeroPowerbar (fraction) {
    display.setWidth(display.getHeroPowerbar(), fraction * 100)
  },

  renderEnemyPowerbar (fraction) {
    display.setWidth(display.getEnemyPowerbar(), fraction * 100)
  },

  renderOnlyHero (player, state) {
    arena.drawImage(images[`fighter-${player.weapon}-${state}`], 50, 75)
  },

  renderHero (player, state) {
    arena.drawImage(images[`frog-${state}`], 70, 60)
    ui.renderHeroPowerbar(player.health / player.maxHealth)
  },

  renderHeroWaiting () {
    arena.drawImage(images[`frog-waiting`], 100, 60)
  },

  renderHeroStriking () {
    arena.drawImage(images[`frog-striking`], 200, 60)
  },

  renderHeroHit () {
    arena.drawImage(images[`frog-hit`], 50, 60)
  },

  renderHeroDefeated () {
    arena.drawImage(images['frog-defeated'], 40, 160)
  },

  renderEnemyWaiting () {
    arena.drawImage(images[`frog-waiting`], 210, 60, true)
  },

  renderEnemyStriking () {
    arena.drawImage(images[`frog-striking`], 90, 60, true)
  },

  renderEnemyHit () {
    arena.drawImage(images[`frog-hit`], 170, 60, true)
  },

  renderEnemyDefeated () {
    arena.drawImage(images['frog-defeated'], 170, 160, true)
  },

  renderEnemy (player, state) {
    arena.drawImage(images[`frog-${state}`], 230, 70, true)
    ui.renderEnemyPowerbar(player.health / player.maxHealth)
  },

  renderWaitState (hero, enemy) {
    arena.clear()
    ui.renderHeroWaiting()
    ui.renderEnemyWaiting()
    ui.renderHeroPowerbar(hero.health / hero.maxHealth)
    ui.renderEnemyPowerbar(enemy.health / enemy.maxHealth)
  },

  clearArena () {
    arena.clear()
  },

  async animateHeroStrike (hero, enemy) {
    arena.clear()
    ui.renderEnemyHit()
    ui.renderHeroStriking()
    ui.renderHeroPowerbar(hero.health / hero.maxHealth)
    ui.renderEnemyPowerbar(enemy.health / enemy.maxHealth)
    await audio.sounds.sfx['sword'].play()
  },

  async animateEnemyStrike (enemy, hero) {
    arena.clear()
    ui.renderHeroHit()
    ui.renderEnemyStriking()
    ui.renderHeroPowerbar(hero.health / hero.maxHealth)
    ui.renderEnemyPowerbar(enemy.health / enemy.maxHealth)
    await audio.sounds.sfx['sword'].play()
  },

  async animateHeroDefeated () {
    arena.clear()
    ui.renderHeroDefeated()
    ui.renderEnemyWaiting()
    await audio.sounds.sfx.lose.play()
  },

  async animateEnemyDefeated () {
    arena.clear()
    ui.renderHeroWaiting()
    ui.renderEnemyDefeated()
    await audio.sounds.sfx.shamisen.play()
  },

  async init () {
    ui.inputEl = document.querySelector('#input')
    ui.instructionsEl = document.querySelector('#instructions')
  }
}

export { ui }
