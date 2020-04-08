import Game from "./game";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class inputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          if (game.gamestate === GAMESTATE.MENU) {
            game.start();
            break;
          } else {
            break;
          }

          break;
        case 82:
          if (game.gamestate === GAMESTATE.RUNNING) {
            break;
          } else if (game.gamestate === GAMESTATE.GAMEOVER) {
            game.gamestate = GAMESTATE.MENU;
            game.start();
            break;
          }
        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
        default:
          break;
      }
    });
  }
}
