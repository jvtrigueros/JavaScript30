const player = document.querySelector('video.player__video.viewer')

const playerControl = document.querySelector('.player__controls')
const playButton = playerControl.querySelector('button.player__button')
const volumeSlider = playerControl.querySelector('input[name=volume].player__slider')
const playbackSlider = playerControl.querySelector('input[name=playbackRate].player__slider')

let isPlaying = false

player.addEventListener('click', handlePlayClick)
playButton.addEventListener('click', handlePlayClick)

volumeSlider.addEventListener('change', handleVolume)
volumeSlider.addEventListener('mousemove', handleVolume)

playbackSlider.addEventListener('change', handlePlayback)
playbackSlider.addEventListener('mousemove', handlePlayback)

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