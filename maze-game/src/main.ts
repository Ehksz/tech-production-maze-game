import 'phaser';
// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960


class MyGame extends Phaser.Scene {
    
    constructor() {
        super('MyGame');
    }

    preload() {
        // Load your assets here (e.g., images, spritesheets, audio)
        this.load.image('logo', '/typescript.svg');
        this.load.image('square','/SquareZombie.png');
        
    }

    create() {
        // Create your game objects and set up your scene here
        const logo = this.add.image(400, 300, 'logo');
        const square = this.add.image(700,400,'square');
        square.scale = 0.1;
        const cursorKeys = this.input.keyboard?.createCursorKeys();
        this.update = () =>{
          if(cursorKeys?.up.isDown){
                square.y -=2;
           }
       }


        // Add a simple tween animation to the logo
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

    }
  
    update() {

    }
    }


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'game',
      width: SIZE_WIDTH_SCREEN,
      height: SIZE_HEIGHT_SCREEN,
      min: {
          width: MIN_SIZE_WIDTH_SCREEN,
          height: MIN_SIZE_HEIGHT_SCREEN
      },
      max: {
          width: MAX_SIZE_WIDTH_SCREEN,
          height: MAX_SIZE_HEIGHT_SCREEN
      }
  },
    scene: MyGame
};

new Phaser.Game(config);





