import { detectCollision } from "/src/colissionDetection.js";
import { random } from "/src/random.js";
import { detectCollision02, detectCollision03 } from "./colissionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("brick");

    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 50;

    this.markedForDeletion = false;
    this.effect = random();
  }

  draw(ctx) {
    //drawing the brick
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    //checking the detection
    if (detectCollision02(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }
}
