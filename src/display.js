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

  showTarget (hiragana) {
    document.querySelector('#display').innerHTML = hiragana
  },

  clearInput () {
    document.querySelector('#input').value = ''
  },

  markError () {
    document.querySelector('#display').classList.add('error')
    document.querySelector('#input').classList.add('error')
  },

  unmarkError () {
    document.querySelector('#display').classList.remove('error')
    document.querySelector('#display').classList.remove('error')
    document.querySelector('#input').classList.remove('error')
    document.querySelector('#input').classList.remove('error')
  }
}

export { display }
