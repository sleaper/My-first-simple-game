// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle = /*#__PURE__*/function () {
  function Paddle(game) {
    _classCallCheck(this, Paddle);

    this.width = 100;
    this.height = 15;
    this.gameWidth = game.gameWidth;
    this.maxSpeed = 10;
    this.speed = 0;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  _createClass(Paddle, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#00f";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      /*ctx.beginPath();
      ctx.moveTo(this.position.x, 0);
      ctx.lineTo(this.position.x, this.position.y);
      ctx.stroke();
        ctx.beginPath();
      ctx.moveTo(0, this.position.y);
      ctx.lineTo(0, this.position.y);
      ctx.stroke();*/
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed;
      if (this.position.x < 0) this.position.x = 0;

      if (this.position.x + this.width > this.gameWidth) {
        this.position.x = this.gameWidth - this.width;
      }
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

var inputHandler = function inputHandler(paddle, game) {
  _classCallCheck(this, inputHandler);

  document.addEventListener("keydown", function (event) {
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
  document.addEventListener("keyup", function (event) {
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
};

exports.default = inputHandler;
},{"./game":"src/game.js"}],"src/colissionDetection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectCollision = detectCollision;
exports.detectCollision02 = detectCollision02;
exports.yDist = exports.xDist = exports.testY = exports.testX = void 0;

//this was the first try of simple detection
function detectCollision(ball, gameObject) {
  var bottomOfBall = ball.position.y + ball.size;
  var topOfBall = ball.position.y - ball.size;
  var topOfObject = gameObject.position.y;
  var leftSideOfObject = gameObject.position.x;
  var rightSideOfObject = gameObject.position.x + gameObject.width;
  var bottomOfObject = gameObject.position.y + gameObject.height;

  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftSideOfObject && ball.position.x + ball.size <= rightSideOfObject) {
    return true;
  } else {
    return false;
  }
} // My main collision detection function, that is using Pythagorean theorem for the distance


var testX;
exports.testX = testX;
var testY;
exports.testY = testY;
var xDist;
exports.xDist = xDist;
var yDist;
exports.yDist = yDist;

function detectCollision02(ball, gameObject) {
  exports.testX = testX = ball.position.x;
  exports.testY = testY = ball.position.y; //closest edge
  //left edge

  if (ball.position.x <= gameObject.position.x) exports.testX = testX = gameObject.position.x; //right edge
  else if (ball.position.x >= gameObject.position.x + gameObject.width) {
      exports.testX = testX = gameObject.position.x + gameObject.width;
    } // top edge

  if (ball.position.y <= gameObject.position.y) exports.testY = testY = gameObject.position.y; // bottom edge
  else if (ball.position.y >= gameObject.position.y + gameObject.height) {
      exports.testY = testY = gameObject.position.y + gameObject.height;
    }
  exports.xDist = xDist = ball.position.x - testX;
  exports.yDist = yDist = ball.position.y - testY; //Pythagorean theorem

  var distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  if (distance <= ball.size) {
    return true;
  } else {
    return false;
  }
}
},{}],"src/random.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomPos = randomPos;
exports.random = random;

// just some simple functions for random positions
function randomPos(min, max) {
  return Math.random() * (max - min) + min;
}

function random() {
  return Math.floor(Math.random() * 10);
}
},{}],"src/ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colissionDetection = require("/src/colissionDetection.js");

var _random = require("/src/random.js");

var _colissionDetection2 = require("./colissionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball = /*#__PURE__*/function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

    this.image = document.getElementById("ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.size = 50;
    this.reset();
  }

  _createClass(Ball, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: (0, _random.randomPos)(10, 590),
        y: (0, _random.randomPos)(100, 400)
      };
      this.speed = {
        x: 5,
        y: -5
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      //drawing circle
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
      ctx.stroke(); //frawing the line between the circle and object (you can see the closest edge)

      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(_colissionDetection2.testX, _colissionDetection2.testY);
      ctx.stroke();
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y; // wall on left and right

      if (this.position.x + this.size > this.gameWidth || this.position.x < 0 + this.size) {
        this.speed.x = -this.speed.x;
      } //wall on top


      if (this.position.y < 0 + this.size) {
        this.speed.y = -this.speed.y;
      } //bottom of game


      if (this.position.y + this.size > this.gameHeight) {
        this.game.lives--;
        this.speed.y = -this.speed.y; //this.reset();
      }

      if ((0, _colissionDetection2.detectCollision02)(this, this.game.paddle)) {
        //check collision with paddle
        this.speed.y = -this.speed.y;
      }
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"/src/colissionDetection.js":"src/colissionDetection.js","/src/random.js":"src/random.js","./colissionDetection":"src/colissionDetection.js"}],"src/brick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colissionDetection = require("/src/colissionDetection.js");

var _random = require("/src/random.js");

var _colissionDetection2 = require("./colissionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Brick = /*#__PURE__*/function () {
  function Brick(game, position) {
    _classCallCheck(this, Brick);

    this.image = document.getElementById("brick");
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 50;
    this.markedForDeletion = false;
    this.effect = (0, _random.random)();
  }

  _createClass(Brick, [{
    key: "draw",
    value: function draw(ctx) {
      //drawing the brick
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      //checking the detection
      if ((0, _colissionDetection2.detectCollision02)(this.game.ball, this)) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.markedForDeletion = true;
      }
    }
  }]);

  return Brick;
}();

exports.default = Brick;
},{"/src/colissionDetection.js":"src/colissionDetection.js","/src/random.js":"src/random.js","./colissionDetection":"src/colissionDetection.js"}],"src/levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = buildLevel;
exports.level3 = exports.level2 = exports.level1 = void 0;

var _brick = _interopRequireDefault(require("/src/brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildLevel(game, level) {
  var bricks = []; //creating bricks

  level.forEach(function (row, rowIndex) {
    row.forEach(function (brick, brickIndex) {
      if (brick === 1) {
        var position = {
          x: 80 * brickIndex,
          y: 80 + 50 * rowIndex
        };
        var object = new _brick.default(game, position);
        bricks.push(object);
      }
    });
  });
  return bricks;
} //levels
//first level is just for testing the collision


var level1 = [[0, 0, 0, 0, 0, 0, 0,, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0,, 1, 0, 0, 0, 0]];
exports.level1 = level1;
var level2 = [[0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.level2 = level2;
var level3 = [[1, 1, 0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]];
exports.level3 = level3;
},{"/src/brick":"src/brick.js"}],"src/lives.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Live = /*#__PURE__*/function () {
  function Live(game, position) {
    _classCallCheck(this, Live);

    this.image = document.getElementById("heart");
    this.size = 30;
    this.position = position;
  }

  _createClass(Live, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Live;
}();

exports.default = Live;
},{}],"src/showLive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLive = showLive;

var _lives = _interopRequireDefault(require("/src/lives.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showLive(game) {
  var object = [];

  for (var i = game.lives; i > 0; i--) {
    var position = {
      x: 2 + i * 25,
      y: 400
    };
    object.push(new _lives.default(game, position));
  }

  return object;
}
},{"/src/lives.js":"src/lives.js"}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _paddle = _interopRequireDefault(require("/src/paddle.js"));

var _input = _interopRequireDefault(require("/src/input.js"));

var _ball = _interopRequireDefault(require("/src/ball.js"));

var _levels = require("/src/levels.js");

var _showLive = require("/src/showLive.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

var Game = /*#__PURE__*/function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new _ball.default(this);
    this.paddle = new _paddle.default(this);
    this.object = [];
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [_levels.level1, _levels.level2, _levels.level3];
    this.currentLevel = 0;
    new _input.default(this.paddle, this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.lives = 3;
      if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
      this.bricks = (0, _levels.buildLevel)(this, this.levels[this.currentLevel]);
      this.ball.reset();
      this.gameObjects = [this.ball, this.paddle];
      this.gamestate = GAMESTATE.RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      // creating hearts
      this.object = (0, _showLive.showLive)(this); //gameover
      //if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

      if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return; //checking for the new level

      /*if (this.bricks.length === 0) {
        this.gamestate = GAMESTATE.NEWLEVEL;
        this.currentLevel++;
        this.start();
      }*/
      //loading of objects

      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks), _toConsumableArray(this.object)).forEach(function (object) {
        return object.update(deltaTime);
      }); //removing bricks after touch
      //this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
      //resize in window

      /*window.addEventListener("resize", () => {
        this.gameWidth = window.innerWidth;
        this.gameHeight = window.innerHeight; 
      }); */
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks), _toConsumableArray(this.object)).forEach(function (objects) {
        return objects.draw(ctx);
      }); //game is paused

      if (this.gamestate === GAMESTATE.PAUSED) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      } //MENU


      if (this.gamestate === GAMESTATE.MENU) {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this.gameHeight / 2);
      } //GAMEOVER


      if (this.gamestate === GAMESTATE.GAMEOVER) {
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        ctx.fillText("(Press R to start again)", this.gameWidth / 2, this.gameHeight / 5);
      }
    } // PAUSE

  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gamestate === GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        this.gamestate = GAMESTATE.PAUSED;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"/src/paddle.js":"src/paddle.js","/src/input.js":"src/input.js","/src/ball.js":"src/ball.js","/src/levels.js":"src/levels.js","/src/showLive.js":"src/showLive.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("/src/game.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d"); //resize

/*canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;*/

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
var game = new _game.default(GAME_WIDTH, GAME_HEIGHT);
var lastTime = 0;

function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"/src/game.js":"src/game.js"}],"C:/Users/Petr/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52349" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Petr/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map