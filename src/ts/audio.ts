import { Sound, SoundLookup } from './types'

const SFX_PATH = 'audio/sfx'

const sfx = [
  { filename: 'typing.mp3', name: 'typing' },
  { filename: 'stick.mp3', name: 'stick' }
]

const loadSound = async (sound, ctx: AudioContext): Promise<Sound> => {
  const raw = await fetch(`./${SFX_PATH}/${sound.filename}`)
  const buf = await raw.arrayBuffer()

  return {
    name: sound.name,
    buffer: await ctx.decodeAudioData(buf)
  }
}

export const loadSounds = async (ctx: AudioContext): Promise<SoundLookup> => {
  const sounds = await Promise.all(sfx.map(sound => loadSound(sound, ctx)))

  return sounds.reduce((memo, sound) => {
    memo[sound.name] = sound
    return memo
  }, {})
}
