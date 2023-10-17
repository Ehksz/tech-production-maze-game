import './style.css'
import Phaser from 'phaser'

const sizes = {
  width: 500,
  height: 500
}

const speedDown = 300

class GameScene extends Phaser.Scene{
  constructor() {
    super("scene-game")
    this.player
  }
  preload(){
    this.load.image("theplayer", "/assets/theplayer.png")
  }
  create(){
    this.player = this.physics.add.image(sizes.width-300, sizes.height-300, "theplayer").setOrigin(0,0)
    this.player.setImmovable(true)
    this.player.body.allowGravity = false
  }
  update(){}
} 


const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics:{
    default:"arcade",
    arcade: {
      gravity:{y:speedDown},
      debug: true
    }
  },
  scene:[GameScene]
}

const game = new Phaser.Game(config)