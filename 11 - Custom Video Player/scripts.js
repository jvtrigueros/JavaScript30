const player = document.querySelector('.viewer')
const playerControl = document.querySelector('.player__controls')
const playButton = playerControl.querySelector('.toggle')
const fullscreenButton = playerControl.querySelector('.fullscreen')
const sliders = playerControl.querySelectorAll('.player__slider')
const dataSkipButtons = playerControl.querySelectorAll('[data-skip]')

const progress = playerControl.querySelector('.progress')

let isPlaying = false
let isScrobbling = false

player.addEventListener('click', togglePlay)
player.addEventListener('play', updatePlayButton)
player.addEventListener('pause', updatePlayButton)
player.addEventListener('timeupdate', updateProgress)
playButton.addEventListener('click', togglePlay)
fullscreenButton.addEventListener('click', toggleFullscreen)

sliders.forEach(slider => {
  slider.addEventListener('change', handleSlider)
  slider.addEventListener('mousemove', handleSlider)
})

dataSkipButtons.forEach(button => button.addEventListener('click', handleSkip))

progress.addEventListener('click', handleScrobbler)
progress.addEventListener('mousemove', event => isScrobbling && handleScrobbler(event))
progress.addEventListener('mousedown', () => isScrobbling = true)
progress.addEventListener('mouseup', () => isScrobbling = false)

function togglePlay (event) {
  if (player.paused) {
    player.play()
  }
  else {
    player.pause()
  }
}

function updatePlayButton (event) {
    playButton.textContent = this.paused ? '►' : '❚❚'
}

function handleSlider (event) {
  player[this.name] = this.value
}

function handleSkip (event) {
  if(this.dataset.skip) {
    player.currentTime += parseInt(this.dataset.skip)
    updateProgress()
  }
}

function handleScrobbler (event) {
  player.currentTime = (event.offsetX / progress.offsetWidth) * player.duration
  updateProgress()
}

function updateProgress () {
  const progress = (player.currentTime / player.duration) * 100.0
  document.documentElement.style.setProperty('--progress', progress + '%')
}

/**
 * Source: https://developer.mozilla.org/samples/domref/fullscreen.html
 */
function toggleFullscreen () {
  if (!document.mozFullScreen && !document.webkitFullScreen) {
    if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else {
      player.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }
  }
}
