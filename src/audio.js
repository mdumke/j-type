import { SoundBuffer } from './sound-buffer.js'
import { HIRAGANA } from './hiragana.js'

const audio = {
  ctx: null,

  sounds: {},

  // load voice recordings and set them as audio.sounds.hiragana
  async loadHiragana () {
    const basePath = 'assets/audio/'
    const format = '.ogg'
    const hiragana = Object.values(HIRAGANA)

    const sounds = await Promise.all(
      hiragana.map(
        char =>
          new Promise((resolve, reject) => {
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

  async loadSFX () {
    const basePath = 'assets/audio/'
    const filenames = ['sword', 'knive', 'typing']
    const sounds = await Promise.all(
      filenames.map(
        name =>
          new Promise(resolve => {
            const sound = new SoundBuffer(audio.ctx, basePath + name + '.mp3')
            sound.load().then(() => resolve({ [name]: sound }))
          })
      )
    )

    audio.sounds.sfx = sounds.reduce(
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
    await Promise.all([audio.loadHiragana(), audio.loadSFX()])
  }
}

export { audio }
