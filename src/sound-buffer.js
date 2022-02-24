class SoundBuffer {
  constructor (ctx, filename) {
    this.ctx = ctx
    this.filename = filename
    this.data = null
  }

  async load () {
    const raw = await fetch(this.filename)
    const buf = await raw.arrayBuffer()
    this.data = await this.ctx.decodeAudioData(buf)
  }

  async play () {
    const source = this.ctx.createBufferSource()
    source.connect(this.ctx.destination)
    source.buffer = this.data
    return new Promise(resolve => {
      source.onended = resolve
      source.start()
    })
  }
}

export { SoundBuffer }
