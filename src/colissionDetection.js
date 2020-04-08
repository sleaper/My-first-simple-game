//this was the first try of simple detection
export function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y - ball.size;

  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
}

// My main collision detection function, that is using Pythagorean theorem for the distance

export let testX;
export let testY;
export let xDist;
export let yDist;

export function detectCollision02(ball, gameObject) {
  testX = ball.position.x;
  testY = ball.position.y;

  //closest edge
  //left edge
  if (ball.position.x <= gameObject.position.x) testX = gameObject.position.x;
  //right edge
  else if (ball.position.x >= gameObject.position.x + gameObject.width) {
    testX = gameObject.position.x + gameObject.width;
  }

  // top edge
  if (ball.position.y <= gameObject.position.y) testY = gameObject.position.y;
  // bottom edge
  else if (ball.position.y >= gameObject.position.y + gameObject.height) {
    testY = gameObject.position.y + gameObject.height;
  }

  xDist = ball.position.x - testX;
  yDist = ball.position.y - testY;

  //Pythagorean theorem
  let distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  if (distance <= ball.size) {
    return true;
  } else {
    return false;
  }
}
