const display = {
  showLoader () {
    document.querySelector('#loader').classList.add('loader')
  },

  hide (elementId) {
    document.querySelector('#' + elementId).classList.add('hide')
  },

  show (elementId) {
    document.querySelector('#' + elementId).classList.remove('hide')
  },

  showWallpaper () {
    document.querySelector('#container').classList.add('wallpaper')
  },

  hideWallpaper () {
    document.querySelector('#container').classList.remove('wallpaper')
  },

  focusInput () {
    document.querySelector('#input').focus()
  },

  showTarget (hiragana, size = '13rem') {
    const el = document.querySelector('#display')
    el.style.fontSize = size
    el.innerHTML = hiragana
  },

  clearInput () {
    document.querySelector('#input').value = ''
  },

  markError () {
    document.querySelector('#display').classList.add('error')
    // document.querySelector('#input').classList.add('error')
  },

  unmarkError () {
    document.querySelector('#display').classList.remove('error')
    // document.querySelector('#input').classList.remove('error')
  },

  getHeroPowerbar () {
    return document.querySelector('#powerbar-left')
  },

  getEnemyPowerbar () {
    return document.querySelector('#powerbar-right')
  },

  setWidth (el, percentage) {
    el.style.width = `${percentage}%`
  }
}

export { display }
