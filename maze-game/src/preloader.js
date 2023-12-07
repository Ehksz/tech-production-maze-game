import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {

        
        this.load.image("home", "/assets/home.jpg");
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
        // Progress bar
        // Load start game, game over, game win images
        // Clicking sound
        // Background music.
        // Button, pressed and unpressed.
        var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, .8);
            progressBox.fillRect(780, 370, 350, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(790, 380, 330 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.src);
            });

            this.load.on('complete', function (file) {
                //this.scene.start('Start', {
                    //background: this.backgroundImage,
                    //playerSpritesheet: this.playerSpritesheet
                });    
            //});

            
    }

    create() {
        // Progress bar text [ Loading ]
            // Store loaded assets in properties of the preload scene
    this.loading = this.add.image(0, 0, 'home');
    //this.backgroundImage = this.add.image(0, 0, 'home').setOrigin(0, 0);
    //this.add.image(0, 0, "home").setOrigin(0, 0);
    this.playerSpritesheet = this.textures.get('player');

    // Transition to the main game scene after loading
    this.scene.start('GameScene', {
        background: this.backgroundImage,
        playerSpritesheet: this.playerSpritesheet
    });

    }
}