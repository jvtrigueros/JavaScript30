const player = document.querySelector('video.player__video.viewer')
const playerControl = document.querySelector('.player__controls')
const playButton = playerControl.querySelector('button.player__button')

let isPlaying = false

player.addEventListener('click', handlePlayClick)
playButton.addEventListener('click', handlePlayClick)

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