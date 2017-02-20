const player = document.querySelector('video.player__video.viewer')

const playerControl = document.querySelector('.player__controls')
const playButton = playerControl.querySelector('button.player__button[title="Toggle Play"]')
const volumeSlider = playerControl.querySelector('input[name=volume].player__slider')
const playbackSlider = playerControl.querySelector('input[name=playbackRate].player__slider')
const dataSkipButtons = playerControl.querySelectorAll('button.player__button')

const scrobbler = playerControl.querySelector('.progress__filled')

let isPlaying = false

player.addEventListener('click', handlePlayClick)
playButton.addEventListener('click', handlePlayClick)

volumeSlider.addEventListener('change', handleVolume)
volumeSlider.addEventListener('mousemove', handleVolume)

playbackSlider.addEventListener('change', handlePlayback)
playbackSlider.addEventListener('mousemove', handlePlayback)

dataSkipButtons.forEach(button => button.addEventListener('click', handleSkip))

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

function updateProgress () {
  const progress = (player.currentTime / player.duration) * 100.0
  document.documentElement.style.setProperty('--progress', progress + '%')
}

setInterval(updateProgress, 1000)