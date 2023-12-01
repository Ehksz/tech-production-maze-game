import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {

    }

    create() {
        // Use the preloaded [background, backgroundMusic, click-sound] from "preloader", 
        // In big text Game Win.
        // Write names of contributors in ASC order.

    }

    update() {
        // On hover of go to start screen text should brighten a little bit. 'Main Menu'
        // On click a click sound should occur and then navigate to start screen.
    }
}