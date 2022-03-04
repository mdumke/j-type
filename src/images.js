const images = {
  basePath: 'assets/images',

  list: [
    {
      name: 'fighter-sword-waiting',
      fileName: 'fighter-sword-1.png',
      offsetX: 0,
      offsetY: 0
    },
    {
      name: 'fighter-sword-striking',
      fileName: 'fighter-sword-2.png',
      offsetX: 0,
      offsetY: 0
    },
    {
      name: 'fighter-knive-waiting',
      fileName: 'fighter-knive-1.png',
      offsetX: 0,
      offsetY: 25
    },
    {
      name: 'fighter-knive-striking',
      fileName: 'fighter-knive-2.png',
      offsetX: -250,
      offsetY: -15
    },
    {
      name: 'fighter-stick-waiting',
      fileName: 'fighter-stick-1.png',
      offsetX: -50,
      offsetY: 23
    },
    {
      name: 'fighter-stick-striking',
      fileName: 'fighter-stick-2.png',
      offsetX: -230,
      offsetY: -15
    },
    {
      name: 'fighter-rails-waiting',
      fileName: 'fighter-rails-1.png',
      offsetX: 0,
      offsetY: 24
    },
    {
      name: 'fighter-rails-striking',
      fileName: 'fighter-rails-2.png',
      offsetX: -210,
      offsetY: 2
    },
    {
      name: 'fighter-defeated',
      fileName: 'fighter-defeated.png',
      offsetX: 0,
      offsetY: 0
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
            images[img.name].src = `${images.basePath}/${img.fileName}`
          })
      )
    )
  }
}

export { images }
