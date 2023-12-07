import "./style.css";
import Phaser from "phaser";
import Preloader from "./preloader";
import Start from "./start";
import GameOver from "./gameover";
import GameWin from "./gamewin";

const sizes = {
  width: 1920,
  height: 1080,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("Maze");
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 10;
    this.object; //template to asiign the mutlple or single object/asset
    this.isMoving = false;
    this.spaceBar;
    this.isJumping = false;
    this.jumpHeight = 100;
    this.orignalJumpSpot; //the oringal y axis when the player initalize the jump
  }

  preload() {
    this.load.image("theplayer", "/assets/theplayer.png");
    this.load.image("bg", "/assets/tilebg.png");
    this.load.audio("bg-audio", "/assets/dead.mp3");
    this.load.audio("soundMove", "/assets/soundMove.mp3");

    //glowing asset
    this.load.image("apple-0", "/assets/glowing-asset/apple-glow.png");
    this.load.image("bag", "/assets/glowing-asset/bag-glow.png");
    this.load.image("book", "/assets/glowing-asset/book-glow.png");
    this.load.image("cauldron", "/assets/glowing-asset/cauldron-glow.png");
    this.load.image("chest", "/assets/glowing-asset/chest-glow.png");
    this.load.image("clock", "/assets/glowing-asset/clock-glow.png");
    this.load.image(
      "feather-quill",
      "/assets/glowing-asset/feather-quill-glow.png"
    );
    this.load.image("horn", "/assets/glowing-asset/horn-glow.png");
    this.load.image("pile", "/assets/glowing-asset/pile-glow.png");
    this.load.image("rat", "/assets/glowing-asset/rat-glow.png");
    this.load.image("red-skull", "/assets/glowing-asset/red-skull-glow.png");
    this.load.image("torch", "/assets/glowing-asset/torch-glow.png");
    this.load.audio("bg-audio", "/assets/dead.mp3");

    //Christian - Artifiacts
    this.load.image("bag-0", "/assets/christian-artifacts/bag.png");
    this.load.image("book-0", "/assets/christian-artifacts/book.png");
    this.load.image("cauldron-0", "/assets/christian-artifacts/cauldron.png");
    this.load.image("chest-0", "/assets/christian-artifacts/chest.png");
    this.load.image("clock-0", "/assets/christian-artifacts/clock.png");
    this.load.image("feather-0", "/assets/christian-artifacts/feather.png");
    this.load.image("horn-0", "/assets/christian-artifacts/horn.png");
    this.load.image("pile-0", "/assets/christian-artifacts/pile.png");
    this.load.image("rat-0", "/assets/christian-artifacts/rat.png");
    this.load.image("red-skull-0", "/assets/christian-artifacts/red-skull.png");
    this.load.image("torch-0", "/assets/christian-artifacts/torch.png");
    this.load.spritesheet("walking", "/assets/new_player.png", {
      frameWidth: 64,
      frameHeight: 64, // Replace with the correct height if it's not 64
    });
  }

  create(data) {
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("walking", {
        start: 0,
        end: 3,
      }), // Replace numberOfFrames with the actual number of frames in your spritesheet
      frameRate: 10,
      repeat: -1, // Loop the animation
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("walking", {
        start: 4,
        end: 7,
      }), // Replace numberOfFrames with the actual number of frames in your spritesheet
      frameRate: 10,
      repeat: -1, // Loop the animation
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("walking", {
        start: 8,
        end: 11,
      }), // Replace numberOfFrames with the actual number of frames in your spritesheet
      frameRate: 10,
      repeat: -1, // Loop the animation
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("walking", {
        start: 12,
        end: 15,
      }), // Replace numberOfFrames with the actual number of frames in your spritesheet
      frameRate: 10,
      repeat: -1, // Loop the animation
    });

    // Add a sprite that uses the animation
    this.player = this.physics.add.sprite(100, 100, "walking");

    // Play the 'walk' animation on the sprite

    //Christian images
    this.add.image(700, 700, "apple-1");
    this.add.image(750, 700, "bag-0");
    this.add.image(800, 700, "book-0");
    this.add.image(850, 700, "cauldron-0");
    this.add.image(900, 700, "chest-0");
    this.add.image(950, 700, "clock-0");
    this.add.image(1000, 700, "feather-0");
    this.add.image(1050, 700, "horn-0");
    this.add.image(1100, 700, "pile-0");
    this.add.image(1150, 700, "rat-0");
    this.add.image(1200, 700, "red-skull-0");
    this.add.image(1250, 700, "torch-0");

    //glowing images
    this.add.image(600, 400, "apple-0");
    this.add.image(650, 400, "bag");
    this.add.image(700, 400, "book");
    this.add.image(750, 400, "cauldron");
    this.add.image(800, 400, "chest");
    this.add.image(850, 400, "clock");
    this.add.image(900, 400, "feather-quill");
    this.add.image(950, 400, "horn");
    this.add.image(1000, 400, "pile");
    this.add.image(1050, 400, "rat");
    this.add.image(1100, 400, "red-skull");
    this.add.image(1150, 400, "torch");
    //player code
    this.soundMove = this.sound.add("soundMove", { volume: 0 });
    this.player.body.allowGravity = false;
    this.player.setImmovable(true);
    this.player.setCollideWorldBounds(true);
    this.cursor = this.input.keyboard.createCursorKeys();
    this.bgMusic = this.sound.add("bg-audio");
    this.bgMusic.play();

    //template for object/asset hitbox
    this.object = this.physics.add
      .image(sizes.width - 300, sizes.height - 300, "apple")
      .setOrigin("50%", "50%");
    this.object.setCollideWorldBounds(true);
    this.object.body.allowGravity = false;
    this.object.setImmovable(true);

    this.physics.add.collider(this.player, this.object);
    this.player.scale = 1;

    this.soundMove.play();

    //when circle is clicked, color changes and text appears
    var colors = [0xff0000, 0x00ff00]; // Red and Green
    var currentIndex = 0; // Start with red
    var textBlock;
    var backgroundRect;
    var scene = this;
    var circle = this.add
      .circle(700, 200, 25, colors[currentIndex])
      .setInteractive();
    var textBlockX = 750;
    var textBlockY = 200;

    circle.on("pointerdown", function () {
      // Toggle color
      currentIndex = (currentIndex + 1) % colors.length;
      circle.fillColor = colors[currentIndex];
      // Toggle text block visibility
      if (currentIndex === 1) {
        if (!textBlock) {
          // Create text block if not exists
          textBlock = scene.add.text(
            textBlockX,
            textBlockY,
            "Hello, this is a text block!",
            { fontSize: "18px", fill: "#fff" }
          );
          textBlock.setVisible(false);
          // Create a semi-transparent rectangle behind the text
          backgroundRect = scene.add.rectangle(
            textBlockX - 10,
            textBlockY - 10,
            textBlock.width + 20,
            textBlock.height + 20,
            0x000000,
            0.7
          );
          backgroundRect.setOrigin(0, 0);
          backgroundRect.setVisible(false);
        }
        textBlock.setVisible(!textBlock.visible);
        // Toggle background rectangle visibility along with the text block
        backgroundRect.setVisible(textBlock.visible);
      } else {
        // If the circle is red, hide the text block and background rectangle
        if (textBlock) {
          textBlock.setVisible(false);
          backgroundRect.setVisible(false);
        }
      }
    });
  }

  //my player controls for testing using keyboard
  update() {
    const playerVolume = this.soundMove.volume;
    this.player.setVelocity(0);
    this.soundMove.setVolume(0);

    if (typeof this.cursor !== "undefined") {
      const { left, right, down, up } = this.cursor;

      // Horizontal movement
      if (left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("walk-left", true);
        this.soundMove.setVolume(0.5);
      } else if (right.isDown) {
        this.soundMove.setVolume(0.5);
        this.player.setVelocityX(160);
        this.player.anims.play("walk-right", true);
      }

      // Vertical movement - only allow if no horizontal keys are pressed
      if (!left.isDown && !right.isDown) {
        if (up.isDown) {
          this.soundMove.setVolume(0.5);
          this.player.setVelocityY(-160);
          this.player.anims.play("walk-up", true);
        } else if (down.isDown) {
          this.soundMove.setVolume(0.5);
          this.player.setVelocityY(160);
          this.player.anims.play("walk-down", true);
        }
      }
    }

    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      // Stop any movement animations when idle
      this.player.anims.stop();
    }

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
    },
  },
  scene: [GameScene, GameOver, GameWin],
};

const game = new Phaser.Game(config);
