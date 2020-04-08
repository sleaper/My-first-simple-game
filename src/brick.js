import { detectCollision } from "/src/colissionDetection.js";
import { random } from "/src/random.js";
import { detectCollision02 } from "./colissionDetection";

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
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y + this.height);
    ctx.lineTo(this.position.x + this.width, this.position.y + this.height);
    ctx.fillStyle = "#FF0000";
    ctx.stroke();
  }

  update(deltaTime) {
    if (detectCollision02(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }
}
