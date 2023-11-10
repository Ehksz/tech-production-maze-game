import "./style.css";
import Phaser from "phaser";

const sizes = {
  width: 1920,
  height: 1080,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game")
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 50;
    this.object;//template to asiign the mutlple or single object/asset

  }

  preload(){
    this.load.image("theplayer", "/assets/theplayer.png");
    this.load.image("apple", "assets/apple.png");
    this.load.image("bg", "/assets/bg.png");

    //glowing asset
    this.load.image('apple-0','/assets/glowing-asset/apple-glow.png');
    this.load.image('bag','/assets/glowing-asset/bag-glow.png');
    this.load.image('book','/assets/glowing-asset/book-glow.png');
    this.load.image('cauldron','/assets/glowing-asset/cauldron-glow.png');
    this.load.image('chest','/assets/glowing-asset/chest-glow.png');
    this.load.image('clock','/assets/glowing-asset/clock-glow.png');
    this.load.image('feather-quill','/assets/glowing-asset/feather-quill-glow.png');
    this.load.image('horn','/assets/glowing-asset/horn-glow.png');
    this.load.image('pile','/assets/glowing-asset/pile-glow.png');
    this.load.image('rat','/assets/glowing-asset/rat-glow.png');
    this.load.image('red-skull','/assets/glowing-asset/red-skull-glow.png');
    this.load.image('torch','/assets/glowing-asset/torch-glow.png');
    this.load.audio('bg-audio', "/assets/dead.mp3");
  }

  create(){
    //glowing images
    this.add.image(600,400,'apple-0');
    this.add.image(650,400,'bag');
    this.add.image(700,400,'book');
    this.add.image(750,400,'cauldron');
    this.add.image(800,400,'chest');
    this.add.image(850,400,'clock');
    this.add.image(900,400,'feather-quill');
    this.add.image(950,400,'horn');
    this.add.image(1000,400,'pile');
    this.add.image(1050,400,'rat');
    this.add.image(1100,400,'red-skull');
    this.add.image(1150,400,'torch');



    //player code
    this.player = this.physics.add.image(sizes.width-300, sizes.height-300, "theplayer").setOrigin(0,0)
    this.player.body.allowGravity = false
    this.player.setCollideWorldBounds(true);
    //keyboard movement for player testing
    this.cursor = this.input.keyboard.createCursorKeys();
        //background audio
        this.bgMusic = this.sound.add('bg-audio');
        // this.bgMusic.play();
        
    //template for object/asset hitbox
    this.object = this.physics.add.image(sizes.width - 300, sizes.height - 300, "apple").setOrigin(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.body.allowGravity = false;
    this.object.setImmovable(true);
    //line 39 is the template for the hitbox of an object/asset
   // this.object.setSize(this.object.width / 10, this.object.height - this.object.height / 10);

   this.physics.add.collider(this.player, this.object);
   this.add.image(0, 0, "bg").setOrigin(0, 0);
   this.player.scale = 0.5;
  }
  
  //my player controls for testing using keyboard
  update(){
    const { left, right, up, down } = this.cursor;

    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }
    
    if (up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }


    // This is main code
    // const cursorKeys = this.input.keyboard?.createCursorKeys();
    // if (cursorKeys?.up.isDown) {
    //   this.player.y -= 2;
    // }
    // else if(cursorKeys?.down.isDown){
    //   this.player.y +=2;
    // }
    // else if(cursorKeys?.left.isDown){
    //   this.player.x -=2;
    // }
    // else if(cursorKeys?.right.isDown){
    //   this.player.x +=2;
    // }

    // for loop create 3 square top each other and beside.
    const size = 40;

    for(let i = 0; i < 3; i++){
      const squarex = 1045;
      const squarey = 500 + i * (size + 5);
      const square = this.add.rectangle(squarex,squarey,size,size,0xffffff);
    }
    
    for(let i = 0; i < 3; i++){
      const squarex = 1000 + i * (size + 5);
      const squarey = 590;
      const square = this.add.rectangle(squarex,squarey,size,size,0xffffff);
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
  scene: [GameScene],
};

const game = new Phaser.Game(config);
