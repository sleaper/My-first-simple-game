import { detectCollision } from "/src/colissionDetection.js";
import { randomPos } from "/src/random.js";
import {
  detectCollision02,
  testX,
  testY,
  xDist,
  yDist,
} from "./colissionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.size = 50;
    this.reset();
  }

  reset() {
    this.position = { x: randomPos(10, 590), y: randomPos(100, 400) };
    this.speed = { x: 5, y: -5 };
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(testX, testY);
    ctx.stroke();
  }

  update(deltaTime) {
    console.log(xDist, yDist);
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall on left and right
    if (
      this.position.x + this.size > this.gameWidth ||
      this.position.x < 0 + this.size
    ) {
      this.speed.x = -this.speed.x;
    }

    //wall on top
    if (this.position.y < 0 + this.size) {
      this.speed.y = -this.speed.y;
    }

    //bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.speed.y = -this.speed.y;
      //this.reset();
    }

    if (detectCollision02(this, this.game.paddle)) {
      //check collision with paddle
      this.speed.y = -this.speed.y;
    }
  }
}
