import { HIRAGANA } from './hiragana.js'
import { Player } from './player.js'

const levelManager = {
  chars: [
    ['あ', 'え', 'い', 'お', 'う'],
    ['か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご']
  ],

  getHero (level) {
    return new Player({
      health: 2 + level,
      weapon: 'sword'
    })
  },

  getEnemy (level) {
    return new Player({
      health: 2 + level,
      weapon: level === 0 ? 'knive' : 'stick'
    })
  },

  getHiragana (level) {
    return levelManager.chars
      .slice(0, level + 1)
      .flatMap(arr => arr)
      .map(char => ({ hiragana: char, romaji: HIRAGANA[char] }))
  }
}

export { levelManager }
