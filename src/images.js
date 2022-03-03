const images = {
  basePath: 'assets/images',

  list: [
    { name: 'fighterA1', fileName: 'fighter-a1.png' },
    { name: 'fighterA2', fileName: 'fighter-a2.png' },
    { name: 'fighterB1', fileName: 'fighter-b1.png' },
    { name: 'fighterB2', fileName: 'fighter-b2.png' },
    { name: 'fighterC1', fileName: 'fighter-c1.png' },
    { name: 'fighterC2', fileName: 'fighter-c2.png' }
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
            images[img.name].src = `${images.basePath}/${img.fileName}`
          })
      )
    )
  }
}

export { images }
