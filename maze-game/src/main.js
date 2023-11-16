import Phaser from 'phaser';

const sizes = {
  width: 1920,
  height: 1080,
};
const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super('scene-game');
    this.player;
    //jumping variables
    this.spaceBar;
    this.isJumping = false;
    this.jumpHeight = 100;
    this.orignalJumpSpot;//the oringal y axis when the player initalize the jump 
  }

  preload() {
    this.load.image('theplayer', 'assets/theplayer.png');
    this.load.image('bg', 'assets/bg.png');
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.player = this.physics.add.sprite(sizes.width - 300, sizes.height - 300, 'theplayer');
    this.player.setScale(0.5);
    this.player.setCollideWorldBounds(true);
    // Create keyboard cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    // creates the button to jump for the player
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    
  }

  update() {
    const player = this.player;

    // Player movement
    if (this.cursors.up.isDown) {
      player.y -= 2;
    } else if (this.cursors.down.isDown) {
      player.y += 2;
    } else if (this.cursors.left.isDown) {
      player.x -= 2;
    } else if (this.cursors.right.isDown) {
      player.x += 2;
    }
    
    // Jumping logic
    if (!this.isJumping) {
      this.originalJumpSpot = player.y;
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && !this.isJumping) {
      this.isJumping = true;
    }
    //logic for when the player jumps once and reaches the jump height value
    if (this.isJumping) {
      player.setVelocityY(-200);
      if (this.originalJumpSpot - this.jumpHeight >= player.y) {
        this.isJumping = false;
        player.setVelocityY(200); // Change velocity to start falling
      }
    }
    //logic for when the player falls back down to the floor/boundary. "onfloor" is set to world boundary; which can be changed
    if (this.isJumping === false && player.body.onFloor()) {
      player.setVelocityY(0); // Stop any vertical velocity
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: speedDown },
      debug: false,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);