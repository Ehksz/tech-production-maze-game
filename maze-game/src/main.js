import "./style.css";
import Phaser from "phaser";

const sizes = {
  width: 1920,
  height: 1080,
};
const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
  }
  preload() {
    this.load.image("theplayer", "/assets/theplayer.png");
    this.load.image("bg", "/assets/bg.png");
  }
  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.player = this.add
      .image(sizes.width - 300, sizes.height - 300, "theplayer")
      .setOrigin(0, 0);

    this.player.scale = 0.5;
    const cursorKeys = this.input.keyboard?.createCursorKeys();
    this.update = () => {
      if (cursorKeys?.up.isDown) {
        this.player.y -= 2;
      }
    };
  }
  update() {}
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
