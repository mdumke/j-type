import { AudioAssets } from './types'

class AudioPlayer {
  src: AudioBufferSourceNode
  out: GainNode
  buffer: AudioBuffer
  ctx: AudioContext
  volume: number

  constructor (audio: AudioAssets, name: string, volume: number = 1) {
    const buffer = audio.sounds[name]?.buffer
    if (!buffer) {
      throw new Error(`unknwon sound ${name}`)
    }
    this.buffer = buffer
    this.volume = volume
    this.ctx = audio.ctx
  }

  async start () {
    this.src = this.buildSourceNode()
    this.out = this.buildGainNode()
    this.src.connect(this.out)
    this.out.connect(this.ctx.destination)
    return new Promise(resolve => {
      this.src.onended = resolve
      this.src.start()
    })
  }

  async play () {
    return this.start()
  }

  async stop (): Promise<void> {
    const delay = 10
    const t = this.ctx.currentTime
    this.out.gain.setValueAtTime(this.volume, t)
    this.out.gain.linearRampToValueAtTime(0, t + delay / 1000)
    return new Promise(resolve => {
      setTimeout(() => {
        this.src.stop()
        resolve()
      }, delay)
    })
  }

  buildSourceNode (): AudioBufferSourceNode {
    const src = this.ctx.createBufferSource()
    src.buffer = this.buffer
    return src
  }

  buildGainNode (): GainNode {
    const gainNode = this.ctx.createGain()
    gainNode.gain.value = this.volume
    return gainNode
  }
}

export { AudioPlayer }
