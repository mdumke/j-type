import { Image, ImageLookup } from './types'

const BASE_PATH = 'images'

const images = [{ filename: 'frog-portrait.png', name: 'frogPortrait' }]

const loadImage = async (item): Promise<Image> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve({
        name: item.name,
        el: img
      })
    }
    img.onerror = reject
    img.src = `${BASE_PATH}/${item.filename}`
  })
}

export const loadImages = async (): Promise<ImageLookup> => {
  const items = await Promise.all(images.map(loadImage))
  return items.reduce((memo, item) => {
    memo[item.name] = item
    return memo
  }, {})
}
