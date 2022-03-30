const images = {
  basePath: 'assets/images',

  list: [
    {
      name: 'frog-waiting',
      fileName: 'frog-waiting.png',
      offsetX: 0,
      offsetY: 0,
      scale: 0.6
    },
    {
      name: 'frog-striking',
      fileName: 'frog-striking.png',
      offsetX: 0,
      offsetY: 0,
      scale: 0.6
    },
    {
      name: 'frog-hit',
      fileName: 'frog-hit.png',
      offsetX: 0,
      offsetY: 0,
      scale: 0.6
    },
    {
      name: 'frog-defeated',
      fileName: 'frog-defeated.png',
      offsetX: 0,
      offsetY: 0,
      scale: 0.6
    }
  ],

  init: async () => {
    return Promise.all(
      images.list.map(
        img =>
          new Promise((resolve, reject) => {
            images[img.name] = document.createElement('img')
            images[img.name].onload = resolve
            images[img.name].onerror = reject
            images[img.name].fileName = img.fileName
            images[img.name].offsetX = img.offsetX
            images[img.name].offsetY = img.offsetY
            images[img.name].scale = img.scale
            images[img.name].src = `${images.basePath}/${img.fileName}`
          })
      )
    )
  }
}

export { images }
