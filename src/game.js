import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";

import { buildLevel, level1, level2, level3 } from "/src/levels.js";
import { showLive } from "/src/showLive.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.object = [];
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;

    this.levels = [level1, level2, level3];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    this.lives = 3;
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    // creating hearts
    this.object = showLive(this);

    //if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    /*if (this.bricks.length === 0) {
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.currentLevel++;
      this.start();
    }*/

    //loading of objects
    [...this.gameObjects, ...this.bricks, ...this.object].forEach((object) =>
      object.update(deltaTime)
    );

    //this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);

    //resize
    /*window.addEventListener("resize", () => {
      this.gameWidth = window.innerWidth;
      this.gameHeight = window.innerHeight; 
    }); */
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks, ...this.object].forEach((objects) =>
      objects.draw(ctx)
    );

    //game is paused
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    //MENU
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    //GAMEOVER
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillText(
        "(Press R to start again)",
        this.gameWidth / 2,
        this.gameHeight / 5
      );
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
