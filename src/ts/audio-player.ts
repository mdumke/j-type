import { AudioAssets } from './types'

class AudioPlayer {
  src: AudioBufferSourceNode

  constructor (audio: AudioAssets, name: string) {
    this.src = this.buildSource(audio, name)
  }

  async start () {
    return new Promise(resolve => {
      this.src.onended = resolve
      this.src.start()
    })
  }

  stop (): void {
    this.src.stop()
  }

  buildSource (audio: AudioAssets, name: string): AudioBufferSourceNode {
    const buffer = audio.sounds[name]?.buffer

    if (!buffer) {
      throw new Error(`unknwon sound ${name}`)
    }

    const src = audio.ctx.createBufferSource()
    src.connect(audio.ctx.destination)
    src.buffer = buffer

    return src
  }
}

export { AudioPlayer }
