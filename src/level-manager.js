import { HIRAGANA } from './hiragana.js'
import { Player } from './player.js'
import { pairwise } from './utils.js'

const levelManager = {
  chars: [
    ['あ', 'え', 'い', 'お', 'う'],
    ['さ', 'し', 'す', 'せ', 'そ']
    // ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    // ['か', 'き', 'く', 'け', 'こ'],
    // ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
    // ['た', 'ち', 'つ', 'て', 'と'],
    // ['だ', 'ぢ', 'づ', 'で', 'ど']
  ],

  getNumLevels () {
    return levelManager.chars.length
  },

  getHero (level) {
    return new Player({
      health: 5
    })
  },

  getEnemy (level) {
    return new Player({
      health: 5
    })
  },

  getHiragana (level) {
    return levelManager.chars
      .slice(0, level + 1)
      .flatMap(arr => arr)
      .map(char => ({ hiragana: char, romaji: HIRAGANA[char] }))
  },

  getLevelSummary (level) {
    const hiraganaTable = pairwise(levelManager.chars[level])
      .map(chars =>
        chars.length === 2
          ? `<tr>
               <td>${chars[0]}</td><td>${HIRAGANA[chars[0]]}</td>
               <td>${chars[1]}</td><td>${HIRAGANA[chars[1]]}</td>
             </tr>`
          : `<tr>
               <td>${chars[0]}</td><td>${HIRAGANA[chars[0]]}</td>
               <td></td><td></td>
             </tr>`
      )
      .join('')

    return `
      <h1 class="level-title">LEVEL ${level + 1}</h1>
      <table class="hiragana-table">
        <tbody>
          ${hiraganaTable}
        </tbody>
      </table>
    `
  }
}

export { levelManager }
