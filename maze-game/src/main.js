import "./style.css";
import Phaser from "phaser";
import Preloader from './preloader';
import Start from './start';
import GameOver from './gameover';
import GameWin from './gamewin';

const sizes = {
  width: 1920,
  height: 1080,
};


const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("Maze")
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 50;
    this.object;//template to asiign the mutlple or single object/asset
    this.isMoving = false;
    this.spaceBar;
    this.isJumping = false;
    this.jumpHeight = 100;
    this.orignalJumpSpot;//the oringal y axis when the player initalize the jump 
  }

  preload() {
    //maze wall
    this.load.image("tiles","/assets/maze-wall/wall.png");
    this.load.image('wall','/drawtiles-spaced.png')
  
    this.load.image("theplayer", "/assets/theplayer.png");
    this.load.image("apple", "assets/apple.png");
    this.load.image("background", "/assets/bg.png");
    this.load.audio('bg-audio', "/assets/dead.mp3");
    this.load.audio('soundMove', "/assets/soundMove.mp3");
    
    //glowing asset
    this.load.image('apple-0', '/assets/glowing-asset/apple-glow.png');
    this.load.image('bag', '/assets/glowing-asset/bag-glow.png');
    this.load.image('book', '/assets/glowing-asset/book-glow.png');
    this.load.image('cauldron', '/assets/glowing-asset/cauldron-glow.png');
    this.load.image('chest', '/assets/glowing-asset/chest-glow.png');
    this.load.image('clock', '/assets/glowing-asset/clock-glow.png');
    this.load.image('feather-quill', '/assets/glowing-asset/feather-quill-glow.png');
    this.load.image('horn', '/assets/glowing-asset/horn-glow.png');
    this.load.image('pile', '/assets/glowing-asset/pile-glow.png');
    this.load.image('rat', '/assets/glowing-asset/rat-glow.png');
    this.load.image('red-skull', '/assets/glowing-asset/red-skull-glow.png');
    this.load.image('torch', '/assets/glowing-asset/torch-glow.png');
    this.load.audio('bg-audio', "/assets/dead.mp3");

    //Christian - Artifiacts
    this.load.image('apple-1', '/assets/christian-artifacts/apple.png');
    this.load.image('bag-0', '/assets/christian-artifacts/bag.png');
    this.load.image('book-0', '/assets/christian-artifacts/book.png');
    this.load.image('cauldron-0', '/assets/christian-artifacts/cauldron.png');
    this.load.image('chest-0', '/assets/christian-artifacts/chest.png');
    this.load.image('clock-0', '/assets/christian-artifacts/clock.png');
    this.load.image('feather-0', '/assets/christian-artifacts/feather.png');
    this.load.image('horn-0', '/assets/christian-artifacts/horn.png');
    this.load.image('pile-0', '/assets/christian-artifacts/pile.png');
    this.load.image('rat-0', '/assets/christian-artifacts/rat.png');
    this.load.image('red-skull-0', '/assets/christian-artifacts/red-skull.png');
    this.load.image('torch-0', '/assets/christian-artifacts/torch.png');
  }




  create(data) {
    // Create the maze - Professor will provided the assets in a commit.
    // Reposition assets to create a maze.
    // Each asset should have a collision attached to it.
    // When user escapes the maze transition to the game win,
    // Counter that starts 1 minute [60, 59, 58, 57, etc] when its hits zero transition to game over.
  
    // We'll also add assets to make it look nice.
    // When Time runs out transition to the the game over.
    // var background = data.background;
    // var playerSpritesheet = data.playerSpritesheet;

    // [name]-[preloader | start | gameover | gamewin | maze]
    // bryan-preloader [maze]
    // angel-preloader[gameover, gamewin] [maze]
    // justice-start [gameover, gamewin] [maze]
    // marlen-start [gameover, gamewin] [maze]
    // edward-maze [maze]
    // su-huan-li-maze [maze]
    
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // Set the scale to cover the entire game width and height
    var background = this.add.image(0, 0, "background");
    background.setScale(config.width / background.width, config.height / background.height);
    background.setOrigin(0);
    //Christian images
    this.add.image(700, 700, 'apple-1');
    this.add.image(750, 700, 'bag-0');
    this.add.image(800, 700, 'book-0');
    this.add.image(850, 700, 'cauldron-0');
    this.add.image(900, 700, 'chest-0');
    this.add.image(950, 700, 'clock-0');
    this.add.image(1000, 700, 'feather-0');
    this.add.image(1050, 700, 'horn-0');
    this.add.image(1100, 700, 'pile-0');
    this.add.image(1150, 700, 'rat-0');
    this.add.image(1200, 700, 'red-skull-0');
    this.add.image(1250, 700, 'torch-0');


    //glowing images
    this.add.image(600, 400, 'apple-0');
    this.add.image(650, 400, 'bag');
    this.add.image(700, 400, 'book');
    this.add.image(750, 400, 'cauldron');
    this.add.image(800, 400, 'chest');
    this.add.image(850, 400, 'clock');
    this.add.image(900, 400, 'feather-quill');
    this.add.image(950, 400, 'horn');
    this.add.image(1000, 400, 'pile');
    this.add.image(1050, 400, 'rat');
    this.add.image(1100, 400, 'red-skull');
    this.add.image(1150, 400, 'torch');
    //player code
    this.soundMove = this.sound.add("soundMove", { volume: 1 });


    this.player = this.physics.add.image(240, 200, "theplayer").setOrigin(0, 0);
    

    // this.player.rotation()
    this.player.body.allowGravity = false
    this.player.setCollideWorldBounds(true);
    //keyboard movement for player testing
    this.cursor = this.input.keyboard.createCursorKeys();
    //background audio
    this.bgMusic = this.sound.add('bg-audio');
    // this.bgMusic.play();

    //template for object/asset hitbox
    this.object = this.physics.add.image(sizes.width - 300, sizes.height - 300, "apple").setOrigin('50%', '50%');
    this.object.setCollideWorldBounds(true);
    this.object.body.allowGravity = false;
    this.object.setImmovable(true);
    //line 39 is the template for the hitbox of an object/asset
    //this.object.setSize(this.object.width / 10, this.object.height - this.object.height / 10);
    
            //maze grid map 1 represent the wall and 0 represent the path
            var level1 = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
            [1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],
            [0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,1,1,1,0,1],
            [1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1],
            [1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,0,1,1,0,1],
            [1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,0,1,1,0,1],
            [1,1,1,1,0,1,1,1,0,0,0,0,0,1,1,1,0,1,1,1,1,1,0,1],
            [1,1,1,1,0,1,0,1,0,1,1,1,0,0,1,1,0,1,1,0,1,1,0,1],
            [1,1,0,0,0,1,0,0,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1],
            [1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1],
            [1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1],
            [1,1,0,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
            [1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
            [1,1,0,1,1,1,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,1,0,0],
            [1,1,0,1,1,1,0,0,0,1,1,1,0,1,0,0,0,0,1,1,0,1,1,1],
            [1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,0,1,1,0,1,1,1],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
           // Create a maze using tilemap
        var map = this.make.tilemap({ data: level1, tileWidth: 56, tileHeight: 35});
        var tiles = map.addTilesetImage('wall', null, 32,18,1,2);
        var layer = map.createLayer(0, tiles, 350, 190);
        layer.scale = 0.5;
       this.physics.world.enable(this.player);
       this.physics.add.collider(this.player, layer);
        map.setCollision(1);
        // visualize the collision Tiles
        //var debugGraphics = this.add.graphics();
       // map.renderDebug(debugGraphics);

    this.physics.add.collider(this.player, this.object,);
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.player.scale = 0.1;

    this.soundMove.setVolume(1);
    this.soundMove.play();

    //circle color changes when clicked
    var colors = [0xff0000, 0x00ff00]; // Red and Green
    var currentIndex = 1; // Start with green
    var circle = this.add.circle(100, 200, 25, colors[currentIndex]).setInteractive();
    circle.on('pointerdown', function () {
      currentIndex = (currentIndex + 1) % colors.length;
      circle.fillColor = colors[currentIndex];
    });
  }

  //my player controls for testing using keyboard
  update() {

    const playerVolume = this.soundMove.volume;

    if (typeof this.cursor !== 'undefined') {
      const { left, right, up, down } = this.cursor;

      if (left.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
        // rotate player to assign direction
        this.player.angle = 270;
        if (playerVolume !== 1) {
          this.soundMove.setVolume(1)
        }
      } else if (right.isDown) {
        this.player.setVelocityX(this.playerSpeed);
        // rotate player to assign direction
        this.player.angle = 90;
        if (playerVolume !== 1) {
          this.soundMove.setVolume(1)
        }
      } else {
        this.player.setVelocityX(0);
        this.soundMove.setVolume(0)
      }
      if (up.isDown) {
        this.player.setVelocityY(-this.playerSpeed);
        // if the left, right and up key is pressed same time then rotate player to assign direction
        if (left.isDown) {
          this.player.angle = 315;
        }
        else if (right.isDown) {
          this.player.angle = 45;
        }
        else {
          this.player.angle = 0;
        }
        if (playerVolume !== 1) {
          this.soundMove.setVolume(1)
        }
      } else if (down.isDown) {
        this.player.setVelocityY(this.playerSpeed);
        // if the left, right and down key is pressed same time then rotate player to assign direction
        if (left.isDown) {
          this.player.angle = 225;
        }
        else if (right.isDown) {
          this.player.angle = 135;
        }
        else {
          this.player.angle = 180;
        }
        if (playerVolume !== 1) {
          this.soundMove.setVolume(1)
        }
      } else {
        this.player.setVelocityY(0);
        if (playerVolume !== 0) {
          this.soundMove.setVolume(0)
        }
      }
    }

    /*/ for loop create 3 square top each other and beside.
    const size = 40;

    for (let i = 0; i < 3; i++) {
      const squarex = 1045;
      const squarey = 500 + i * (size + 5);
      const square = this.add.rectangle(squarex, squarey, size, size, 0xffffff);
    }

    for (let i = 0; i < 3; i++) {
      const squarex = 1000 + i * (size + 5);
      const squarey = 590;
      const square = this.add.rectangle(squarex, squarey, size, size, 0xffffff);
    }*/

    // Jumping logic
    if (!this.isJumping) {
      this.originalJumpSpot = this.player.y;
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && !this.isJumping) {
      this.isJumping = true;
    }
    //logic for when the player jumps once and reaches the jump height value
    if (this.isJumping) {
      this.player.setVelocityY(-200);
      if (this.originalJumpSpot - this.jumpHeight >= this.player.y) {
        this.isJumping = false;
        this.player.setVelocityY(200); // Change velocity to start falling
      }
    }
    //logic for when the player falls back down to the floor/boundary. "onfloor" is set to world boundary; which can be changed
    if (this.isJumping === false && this.player.body.onFloor()) {
      this.player.setVelocityY(0); // Stop any vertical velocity
    }
  }
}


const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene, GameOver, GameWin],
};

const game = new Phaser.Game(config);
