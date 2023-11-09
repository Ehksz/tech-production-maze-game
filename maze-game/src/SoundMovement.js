import Phaser from "phaser";

init(){
    isMoving: false,
    //setting our bool to false to trigger audio
  }
create(){
    this.soundMove = this.sound.add("soundMove", {
        volume: 1,
        loop: true
        //adding sound & looping it
    });
}
update(){
    if ((this.player.vel.x > 0 || this.player.vel.x < 0) &&
    this.isMoving === false
    ) {
      this.soundMove.play();
      this.isMoving = true;
    }
    //if player is moving set the sound to play and make our bool true
    
      if (this.player.vel.x === 0) {
          this.soundMove.stop();
          this.isMoving = false;
      }
    }
    //if player is not moving stop sound and keep bool as false