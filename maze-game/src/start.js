import Phaser from "phaser";

export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    create() {
        // Background Image
        // "Maze Game" in large text.
        // Add background music
        // Credits

        // Create any necessary elements for the start scene
        // For example: this.add.image(400, 300, 'startButton').setInteractive();

        // Set up an event listener for the start button
        // this.input.on('pointerdown', function (pointer, gameObject) {
        //     // Transition to the game scene when the start button is clicked
        //     this.scene.start('GameScene');
        // }, this);


    }

    update() {
        // Hovering over button brighten it a little bit.
        // Button not pressed
        // Button pressed
        // Click sound when pressed and should navigate you to the the main game.
    }
}