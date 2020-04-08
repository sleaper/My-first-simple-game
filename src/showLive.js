import Live from "/src/lives.js";

export function showLive(game) {
  let object = [];
  for (let i = game.lives; i > 0; i--) {
    let position = {
      x: 2 + i * 25,
      y: 400
    };

    object.push(new Live(game, position));
  }

  return object;
}
