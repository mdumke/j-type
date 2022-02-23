class Hiragana {
  constructor () {
    this.current = 0
    this.level = 0
  }

  level (lv) {
    this.level = lv
    return this
  }

  toJSON () {
    return {
      hiragana: HIRAGANA[this.level][this.current][0],
      romaji: HIRAGANA[this.level][this.current][1]
    }
  }

  sample () {
    while (true) {
      const newTarget = Math.floor(Math.random() * HIRAGANA[this.level].length)

      if (newTarget !== this.current) {
        this.current = newTarget
        return this.toJSON()
      }
    }
  }
}

const HIRAGANA = [
  [
    ['あ', 'a'],
    ['え', 'e'],
    ['い', 'i'],
    ['お', 'o'],
    ['う', 'u']
  ],
  [
    ['か', 'ka'],
    ['さ', 'sa'],
    ['た', 'ta'],
    ['な', 'na'],
    ['き', 'ki'],
    ['し', 'shi'],
    ['ち', 'chi'],
    ['に', 'ni'],
    ['く', 'ku'],
    ['す', 'su'],
    ['つ', 'tsu'],
    ['ぬ', 'nu']
  ],
  [
    ['け', 'ke'],
    ['せ', 'se'],
    ['て', 'te'],
    ['ね', 'ne'],
    ['こ', 'ko'],
    ['そ', 'so'],
    ['と', 'to'],
    ['の', 'no'],
    ['ゔ', 'v'],
    ['ん', 'n'],
    ['は', 'ha'],
    ['ま', 'ma'],
    ['や', 'ya'],
    ['ら', 'ra'],
    ['ひ', 'hi'],
    ['み', 'mi'],
    ['り', 'ri'],
    ['ふ', 'fu'],
    ['む', 'mu'],
    ['ゆ', 'yu'],
    ['る', 'ru'],
    ['へ', 'he'],
    ['め', 'me'],
    ['れ', 're'],
    ['ほ', 'ho'],
    ['も', 'mo'],
    ['よ', 'yo'],
    ['ろ', 'ro'],
    ['わ', 'wa'],
    ['が', 'ga'],
    ['ざ', 'za'],
    ['だ', 'da'],
    ['ば', 'ba'],
    ['ぱ', 'pa'],
    ['ぎ', 'gi'],
    ['じ', 'ji'],
    ['ぢ', 'dji'],
    ['び', 'bi'],
    ['ぴ', 'pi'],
    ['ぐ', 'gu'],
    ['ず', 'zu'],
    ['づ', 'dzu'],
    ['ぶ', 'bu'],
    ['ぷ', 'pu'],
    ['げ', 'ge'],
    ['ぜ', 'ze'],
    ['で', 'de'],
    ['べ', 'be'],
    ['ぺ', 'pe'],
    ['を', 'wo'],
    ['ご', 'go'],
    ['ぞ', 'zo'],
    ['ど', 'do'],
    ['ぼ', 'bo'],
    ['ぽ', 'po']
  ]
]

export { Hiragana }
