import Ball from "./classes/Ball.js";
import Canvas from "./classes/Canvas.js";
import Area from "./classes/Area.js";

(function() {
  // content here

  const $maxV = 1;
  const $accelerationUp = 0.0000002;
  const $accelerationDown = 0.000002;

  const $canvasElement = document.getElementById("canvas"),
    $startButton = document.getElementById("startButton"),
    $gameOverButton = document.getElementById("gameOverButton"),
    $grey = document.getElementById("grey");
  let $isMouseDown = false;
  $canvasElement.addEventListener("mousedown", () => ($isMouseDown = true));
  $canvasElement.addEventListener("mouseup", () => ($isMouseDown = false));
  const $canvas = new Canvas($canvasElement, false),
    $ballFromBottom = 0.7,
    $accelerationFactor = $accelerationUp;
  let $state = {};
  let $counter = 0;

  const initGame = function() {
    $state = {
      ball: new Ball(0.000002),
      background: null,
      lastRender: 0,
      areas: [
        new Area(),
        new Area(),
        new Area(),
        new Area(),
        new Area(true),
        new Area(true),
        new Area(true),
        new Area(true)
      ]
    };
    $counter = 0;
  };

  const getCurrentDirection = function() {
    const areaBallIsIn =
      $state.ball.yOffset > 1 - $ballFromBottom
        ? $state.areas[6]
        : $state.areas[7];
    return (
      (areaBallIsIn.isGreen() ? 1 : -($accelerationDown / $accelerationUp)) *
      ($isMouseDown ? -1 : 1)
    );
  };

  const getAcceleration = function() {
    return getCurrentDirection() * $accelerationFactor;
  };

  const isGameOver = function(isAccelerating) {
    return !isAccelerating && $state.ball.velocity <= 0;
  };

  const update = function(progress) {
    const acceleration = getAcceleration();

    $state.ball.accelerate(acceleration, progress);
    $state.ball.refresh(progress);

    if ($state.ball.yOffset >= 1) {
      $state.areas.unshift(new Area());
      $state.areas.splice(8, 1);
      $state.ball.yOffset--;
      $counter++;
    }
  };

  const draw = function() {
    // Draw the state of the world

    $canvas.reset();

    for (let i = 0; i < $state.areas.length; i++) {
      $canvas.area(i, $state.areas[i], $state.ball, $isMouseDown);
    }

    $canvas.ball($ballFromBottom, getAcceleration() > 0);

    $canvas.text($counter);
  };

  const loop = function(timestamp) {
    var progress = timestamp - $state.lastRender;

    update(progress);
    draw();

    $state.lastRender = timestamp;

    if (!isGameOver()) {
      window.requestAnimationFrame(loop);
    } else {
      gameOver();
    }
  };

  const gameOver = function() {
    $canvas.rect(0, 0, window.innerWidth, window.innerHeight, "#55555599");
    $gameOverButton.style.display = "block";
  };

  const startGame = function() {
    initGame();
    $canvasElement.style.display = "block";
    $startButton.style.display = "none";
    $gameOverButton.style.display = "none";
    window.requestAnimationFrame(loop);
  };

  const mainMenu = function() {
    $canvasElement.style.display = "none";
    $gameOverButton.style.display = "none";
    $startButton.style.display = "block";
  };

  $startButton.addEventListener("click", () => startGame());
  $gameOverButton.addEventListener("click", () => startGame());

  mainMenu();
})();
