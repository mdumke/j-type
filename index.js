import { HIRAGANA } from './hiragana.js'

const DISPLAY = document.querySelector('#display')
const INPUT = document.querySelector('#input')

let target = 0

const handleSuccess = () => {
  reset()
}

const handleError = () => {
  DISPLAY.classList.add('error')
  INPUT.classList.add('error')
}

const handleWait = () => {
  DISPLAY.classList.remove('error')
  INPUT.classList.remove('error')
}

const step = () => {
  const guess = INPUT.value
  const goal = HIRAGANA[target][1]

  if (guess === goal) {
    handleSuccess()
  } else if (guess !== goal.slice(0, guess.length)) {
    handleError()
  } else {
    handleWait()
  }
}

const chooseTarget = currentTarget => {
  while (true) {
    const newTarget = Math.floor(Math.random() * HIRAGANA.length)

    if (newTarget !== currentTarget) {
      return newTarget
    }
  }
}

const reset = () => {
  target = chooseTarget(target)

  DISPLAY.innerHTML = HIRAGANA[target][0]
  INPUT.value = ''
}

const main = () => {
  document.querySelector('#input').addEventListener('input', step)
  reset()
}

document.addEventListener('DOMContentLoaded', main, { once: true })
