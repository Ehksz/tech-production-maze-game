import Phaser from "phaser";

export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    create() {
        // Background Image
        var background = this.add.image(0, 0, "background");
        background.setScale(config.width / background.width, config.height / background.height);
        background.setOrigin(0);

        // "Maze Game" in large text.
        var startTextX = 750;
        var startTextY = 300;
        this.add.text(startTextX, startTextY, "Maze Game", {
            fontSize: '100px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            color: '#000000',
        });
        //"instructions" in smaller text
        this.add.text(startTextX + 200, startTextY + 200, "click here to start", {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#000000',
        });

        // Hovering over button brighten it a little bit.
        var circle = this.add.circle(startTextX + 300, startTextY + 290, 50, 0x8B0000).setInteractive();
         // Set the circle interactive to enable pointer events
        circle.setInteractive();
        // Event listeners for hover
        circle.on('pointerover', function () {
            // Change color when hovered
            circle.fillColor = 0xff0000;
        });
        circle.on('pointerout', function () {
            // Reset to the original color when not hovered
            circle.fillColor = 0x8B0000;
        });

        // Create any necessary elements for the start scene
        // For example: this.add.image(400, 300, 'startButton').setInteractive();

        // Set up an event listener for the start button
        // this.input.on('pointerdown', function (pointer, gameObject) {
        //     // Transition to the game scene when the start button is clicked
        //     this.scene.start('GameScene');
        // }, this);

        // Add background music
        // Credits


    }

    update() {
        
        // Click sound when pressed and should navigate you to the the main game.
    }
}