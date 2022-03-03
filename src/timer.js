class Timer {
  constructor (cb) {
    this.cb = cb
    this.duration
    this.repeat
    this.timeout
    this.interval
  }

  start (duration = 1000, repeat = false) {
    this.duration = duration
    this.repeat = repeat

    if (repeat) {
      this.interval = setInterval(this.cb, duration)
    } else {
      this.timeout = setTimeout(this.cb, duration)
    }
  }

  stop () {
    this.timeout && clearTimeout(this.timeout)
    this.interval && clearInterval(this.interval)
  }

  restart () {
    if (this.duration) {
      this.stop()
      this.start(this.duration, this.repeat)
    }
  }
}

export { Timer }
