// class Hiragana {
//   constructor (level) {
//     this.current = 0
//     this.level = level
//     this.chars = HIRAGANA.slice(0, this.level + 1).flatMap(chars => chars)
//   }

//   toJSON () {
//     return {
//       hiragana: this.chars[this.current][0],
//       romaji: this.chars[this.current][1]
//     }
//   }

//   sample () {
//     while (true) {
//       const newTarget = Math.floor(Math.random() * this.chars.length)

//       if (newTarget !== this.current) {
//         this.current = newTarget
//         return this.toJSON()
//       }
//     }
//   }
// }

// const HIRAGANA = [
//   [
//     ['あ', 'a'],
//     ['え', 'e'],
//     ['い', 'i'],
//     ['お', 'o'],
//     ['う', 'u']
//   ],
//   [
//     ['か', 'ka'],
//     ['き', 'ki'],
//     ['く', 'ku'],
//     ['け', 'ke'],
//     ['こ', 'ko'],
//     ['が', 'ga'],
//     ['ぎ', 'gi'],
//     ['ぐ', 'gu'],
//     ['げ', 'ge'],
//     ['ご', 'go']
//   ]
// ]

// [
//   ['さ', 'sa'],
//   ['た', 'ta'],
//   ['な', 'na'],
//   ['し', 'shi'],
//   ['ち', 'chi'],
//   ['に', 'ni'],
//   ['す', 'su'],
//   ['つ', 'tsu'],
//   ['ぬ', 'nu'],
//   ['せ', 'se'],
//   ['て', 'te'],
//   ['ね', 'ne'],
//   ['そ', 'so'],
//   ['と', 'to'],
//   ['の', 'no'],
//   ['ゔ', 'v'],
//   ['ん', 'n'],
//   ['は', 'ha'],
//   ['ま', 'ma'],
//   ['や', 'ya'],
//   ['ら', 'ra'],
//   ['ひ', 'hi'],
//   ['み', 'mi'],
//   ['り', 'ri'],
//   ['ふ', 'fu'],
//   ['む', 'mu'],
//   ['ゆ', 'yu'],
//   ['る', 'ru'],
//   ['へ', 'he'],
//   ['め', 'me'],
//   ['れ', 're'],
//   ['ほ', 'ho'],
//   ['も', 'mo'],
//   ['よ', 'yo'],
//   ['ろ', 'ro'],
//   ['わ', 'wa'],
//   ['ざ', 'za'],
//   ['だ', 'da'],
//   ['ば', 'ba'],
//   ['ぱ', 'pa'],
//   ['じ', 'ji'],
//   ['ぢ', 'dji'],
//   ['び', 'bi'],
//   ['ぴ', 'pi'],
//   ['ず', 'zu'],
//   ['づ', 'dzu'],
//   ['ぶ', 'bu'],
//   ['ぷ', 'pu'],
//   ['ぜ', 'ze'],
//   ['で', 'de'],
//   ['べ', 'be'],
//   ['ぺ', 'pe'],
//   ['を', 'wo'],
//   ['ぞ', 'zo'],
//   ['ど', 'do'],
//   ['ぼ', 'bo'],
//   ['ぽ', 'po']
// ]

const HIRAGANA = {
  あ: 'a',
  え: 'e',
  い: 'i',
  お: 'o',
  う: 'u',

  か: 'ka',
  き: 'ki',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go'

  // さ: 'sa',
  // す: 'su',
  // せ: 'se',
  // そ: 'so',
  // た: 'ta',
  // な: 'na',
  // は: 'ha',
  // ま: 'ma',
  // や: 'ya',
  // わ: 'wa',
  // ざ: 'za',
  // だ: 'da',
  // ば: 'ba',
  // ぱ: 'pa',
  // ら: 'ra',

  // し: 'shi',
  // ち: 'chi',
  // に: 'ni',
  // つ: 'tsu',
  // ぬ: 'nu',
  // て: 'te',
  // ね: 'ne',
  // と: 'to',
  // の: 'no',
  // ゔ: 'v',
  // ん: 'n',
  // ひ: 'hi',
  // み: 'mi',
  // り: 'ri',
  // ふ: 'fu',
  // む: 'mu',
  // ゆ: 'yu',
  // る: 'ru',
  // へ: 'he',
  // め: 'me',
  // れ: 're',
  // ほ: 'ho',
  // も: 'mo',
  // よ: 'yo',
  // ろ: 'ro',
  // じ: 'ji',
  // ぢ: 'dji',
  // び: 'bi',
  // ぴ: 'pi',
  // ず: 'zu',
  // づ: 'dzu',
  // ぶ: 'bu',
  // ぷ: 'pu',
  // ぜ: 'ze',
  // で: 'de',
  // べ: 'be',
  // ぺ: 'pe',
  // を: 'wo',
  // ぞ: 'zo',
  // ど: 'do',
  // ぼ: 'bo',
  // ぽ: 'po'
}

export { HIRAGANA }
