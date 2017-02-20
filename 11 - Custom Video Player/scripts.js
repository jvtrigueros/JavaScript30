const player = document.querySelector('.viewer')
const playerControl = document.querySelector('.player__controls')
const playButton = playerControl.querySelector('.toggle')
const volumeSlider = playerControl.querySelector('input[name=volume].player__slider')
const playbackSlider = playerControl.querySelector('input[name=playbackRate].player__slider')
const dataSkipButtons = playerControl.querySelectorAll('[data-skip]')

const progress = playerControl.querySelector('.progress')

let isPlaying = false
let isScrobbling = false

player.addEventListener('click', handlePlayClick)
playButton.addEventListener('click', handlePlayClick)

volumeSlider.addEventListener('change', handleVolume)
volumeSlider.addEventListener('mousemove', handleVolume)

playbackSlider.addEventListener('change', handlePlayback)
playbackSlider.addEventListener('mousemove', handlePlayback)

dataSkipButtons.forEach(button => button.addEventListener('click', handleSkip))

progress.addEventListener('click', handleScrobbler)
progress.addEventListener('mousemove', handleScrobbler)
progress.addEventListener('mousedown', () => isScrobbling = true)
progress.addEventListener('mouseup', () => isScrobbling = false)

function handlePlayClick (event) {
  if (!isPlaying) {
    player.play()
    playButton.innerHTML = '❚❚'
  }
  else {
    player.pause()
    playButton.innerHTML = '►'
  }

  isPlaying = !isPlaying
}

function handleVolume (event) {
  player.volume = this.value
}

function handlePlayback (event) {
  player.playbackRate = this.value
}

function handleSkip (event) {
  if(this.dataset.skip) {
    player.currentTime += parseInt(this.dataset.skip)
    updateProgress()
  }
}

function handleScrobbler (event) {
  if(isScrobbling) {
    player.currentTime = (event.offsetX / this.offsetWidth) * player.duration
    updateProgress()
  }
}

function updateProgress () {
  const progress = (player.currentTime / player.duration) * 100.0
  document.documentElement.style.setProperty('--progress', progress + '%')
}

setInterval(() => (!player.seeking) && updateProgress(), 1000)