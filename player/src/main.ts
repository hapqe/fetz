import './player.css'
import Player from './lib/Player.svelte'

const player = new Player({
  target: document.getElementById('player'),
})

export default player
