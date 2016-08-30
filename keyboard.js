// make an object to store whether every single key is currently
// being pressed.
var IS_KEY_PRESSED = {};

// store key codes of specific keyboard characters.
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

var posX = 0;
var posY = 0;

var vx = 0;
var vy = 0;

var ax = 0;
var ay = 0;
var ACC_STEP_SIZE = 3;

var MAX_ACC = 30;
var MAX_SPEED = 10;

// use the event object to look at the `which` property
// to see which key is being pressed down.
document.addEventListener("keydown", function(e) {
  IS_KEY_PRESSED[e.which] = true;
});

document.addEventListener("keyup", function(e) {
  IS_KEY_PRESSED[e.which] = false;
});

// set game to thirty frames per 1000 ms.
var FRAMES_PER_SECOND = 1000 / 30;
setInterval(gameLoop, FRAMES_PER_SECOND);

// This function is where the game logic actually happens.
// We can check to see if a keyboard button is being pressed
// and make the game react appropriately.
function gameLoop() {
  // use if, if, if to check each key individually so that players can go
  // "up" and "left" at the same time!
  if (IS_KEY_PRESSED[UP_ARROW]) {
    ay -= ACC_STEP_SIZE;
  } else if (IS_KEY_PRESSED[DOWN_ARROW]) {
    ay += ACC_STEP_SIZE;
  } else {
    ay = 0;
  }

  // If this were an "else if" statement then the game would
  // never react to two buttons being pressed at the same time and
  // players would only be able to steer in one direction at a time.
  if (IS_KEY_PRESSED[LEFT_ARROW]) {
    ax -= ACC_STEP_SIZE;
  } else if (IS_KEY_PRESSED[RIGHT_ARROW]) {
    ax += ACC_STEP_SIZE;
  } else {
    ax = 0;
  }

  // cap the acceleration so we can never accelerate too fast.
  ax = Math.min(ax, MAX_ACC);
  ay = Math.min(ay, MAX_ACC);

  ax = Math.max(ax, -MAX_ACC);
  ay = Math.max(ay, -MAX_ACC);


  vx += ax;
  vy += ay;

  // cap the speed so we can never go too fast.
  vx = Math.min(vx, MAX_SPEED);
  vy = Math.min(vy, MAX_SPEED);

  vx = Math.max(vx, -MAX_SPEED);
  vy = Math.max(vy, -MAX_SPEED);


  // read the target's current CSS properties
  var x = $("#target").css("left");
  var y = $("#target").css("top");

  x = parseInt(x, 10);
  y = parseInt(y, 10);

  var newPosX = posX + vx;
  var newPosY = posY + vy;

  newPosX = Math.max(0, newPosX);
  newPosY = Math.max(0, newPosY);

  newPosX = Math.min(newPosX, window.innerWidth);
  newPosY = Math.min(newPosY, window.innerHeight);

  // calculate what you want the properties to be
  posX = newPosX;
  posY = newPosY;

  // re-save the values back in the CSS
  $("#target").css("left", posX + "px");
  $("#target").css("top", posY + "px");

  console.log("pos:", posX, posY, "speed:", vx, vy, "acc:", ax, ay);
}

function createTarget() {
  var div = document.createElement("div");
  div.id = "target";
  div.style.position = "fixed";
  div.style.border = "solid black 1px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.display = "inline-block";
  div.style.backgroundColor = "green";
  div.style.top = 0;
  div.style.left = 0;

  document.body.appendChild(div);
}

createTarget();
