import { Image } from './types'
import frogPortrait from '../assets/images/frog-portrait.png'

const images = [{ path: frogPortrait, name: 'frog-portrait' }]

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
    img.src = item.path
  })
}

export const loadImages = async (): Promise<Image[]> =>
  Promise.all(images.map(loadImage))
