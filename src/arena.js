const arena = {
  canvas: null,
  ctx: null,

  clear () {
    arena.ctx.clearRect(0, 0, arena.canvas.width, arena.canvas.height)
  },

  drawImage (img, x, y, flip = false) {
    if (flip) {
      arena.ctx.save()
      arena.ctx.translate(x + img.offsetX + img.width, y + img.offsetY)
      arena.ctx.scale(-1, 1)
      arena.ctx.drawImage(img, 0, 0)
      arena.ctx.restore()
    } else {
      arena.ctx.drawImage(
        img,
        x + img.offsetX,
        y + img.offsetY,
        img.width,
        img.height
      )
    }
  },

  async init () {
    arena.canvas = document.querySelector('#arena')
    arena.ctx = arena.canvas.getContext('2d')
  }
}

export { arena }
