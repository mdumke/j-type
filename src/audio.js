import { SoundBuffer } from './sound-buffer.js'
import { HIRAGANA } from './hiragana.js'

const audio = {
  ctx: null,

  sounds: {},

  // load voice recordings and set them as audio.sounds.hiragana
  async loadHiragana () {
    const basePath = 'assets/audio/'
    const format = '.ogg'
    const hiragana = HIRAGANA.flatMap(level => level).map(([h, r]) => r)

    const sounds = await Promise.all(
      hiragana.map(
        char =>
          new Promise(resolve => {
            const filename = basePath + char + format
            const sound = new SoundBuffer(audio.ctx, filename)
            sound.load().then(() => resolve({ [char]: sound }))
          })
      )
    )

    audio.sounds.hiragana = sounds.reduce(
      (acc, el) => ({
        ...acc,
        ...el
      }),
      {}
    )
  },

  async playVoiceRecording (romaji) {
    await audio.sounds.hiragana[romaji].play()
  },

  async init () {
    audio.ctx = new AudioContext()
    await audio.loadHiragana()
  }
}

export { audio }
