import Brick from "/src/brick";

export function buildLevel(game, level) {
  let bricks = [];

  //creating bricks
  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 80 + 50 * rowIndex,
        };
        let object = new Brick(game, position);
        bricks.push(object);
      }
    });
  });

  return bricks;
}

//levels
//first level is just for testing the collision
export const level1 = [
  [0, 0, 0, 0, 0, 0, 0, , 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, , 1, 0, 0, 0, 0],
];

export const level2 = [
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const level3 = [
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
