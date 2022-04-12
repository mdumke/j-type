import { Image, ImageLookup } from './types'

const BASE_PATH = 'images'

const sprites = [
  { path: 'sprites/frog-waiting.png', name: 'frogPortrait' },
  { path: 'sprites/frog-portrait.png', name: 'frogPortrait' }
]

const backgrounds = [
  { path: 'backgrounds/backstory.png', name: 'backstory' },
  { path: 'backgrounds/home.png', name: 'home' },
  { path: 'backgrounds/level-1-intro.png', name: 'level-1-intro' },
  { path: 'backgrounds/level-2-intro.png', name: 'level-2-intro' },
  { path: 'backgrounds/level-1.png', name: 'level-1' },
  { path: 'backgrounds/level-2.png', name: 'level-2' }
]

const loadImage = async (item): Promise<Image> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve({
        name: item.name,
        img
      })
    }
    img.onerror = reject
    img.src = `${BASE_PATH}/${item.path}`
  })
}

export const loadSprites = async (): Promise<ImageLookup> => {
  const items = await Promise.all(sprites.map(loadImage))
  return items.reduce((memo, item) => {
    memo[item.name] = item
    return memo
  }, {})
}

export const loadBackgrounds = async (): Promise<ImageLookup> => {
  const items = await Promise.all(backgrounds.map(loadImage))
  return items.reduce((memo, item) => {
    item.img.classList.add('background-image')
    memo[item.name] = item
    return memo
  }, {})
}
