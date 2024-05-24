// Canvas Setup
var cnv = document.getElementById("myCanvas");
var ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

function getRain() {
  var rain2 = {
    x: Math.random() * cnv.width,
    y: -20,
    w: 2,
    h: 20,
    colour: "#005e89",
    ySpeed: 60,
  };

  return rain2;
}

function getLightning() {
  var lightning = {
    x: Math.random() * cnv.width,
    y: -10,
    w: 20,
    h: 900,
    colour: "#e5de00",
  };

  return lightning;
}

function getCircle() {
  var circle = {
    x: Math.random() * cnv.width,
    y: 460,
    radius: Math.random() * 100 + 40,
    colour: "gray",
    xSpeed: 5,
  };

  return circle;
}

var allLightning = [];
var allCircles = [];
var rain = [];

for (let i = 0; i < 40; i++) {
  allCircles.push(getCircle());
}

for (let i = 0; i < 1; i++) {
  allLightning.push(getLightning());
}

for (let i = 0; i < 100; i++) {
  rain.push(getRain());
}

var frame = 0;

function drawRain(rain) {
  for (let i = 0; i < rain.length; i++) {
    ctx.fillStyle = rain[i].colour;
    ctx.fillRect(rain[i].x, rain[i].y, rain[i].w, rain[i].h);
  }
}

function drawLightning(allLightning) {
  for (let i = 0; i < allLightning.length; i++) {
    ctx.fillStyle = allLightning[i].colour;
    ctx.fillRect(
      allLightning[i].x,
      allLightning[i].y,
      allLightning[i].w,
      allLightning[i].h
    );
  }
}

function drawCircles(allCircles) {
  for (let i = 0; i < allCircles.length; i++) {
    ctx.fillStyle = allCircles[i].colour;
    ctx.beginPath();
    ctx.arc(
      allCircles[i].x,
      allCircles[i].y,
      allCircles[i].radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

requestAnimationFrame(animation);

function animation() {
  frame++;

  // Waves
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, 1000, 800);
  ctx.fillStyle = "#005e89";
  ctx.fillRect(0, 500, 1000, 300);

  drawCircles(allCircles);
  drawRain(rain);
  if (lPressed) {
    drawLightning(allLightning);
  }

  requestAnimationFrame(animation);

  if (frame == 45) {
    frame = 0;
  }

  for (let i = 0; i < frame; i++) {
    allCircles[i].x += allCircles[i].xSpeed;

    if (allCircles[i].x > 1000) {
      allCircles[i].x = -100;
    }
  }

  for (let i = 0; i < frame; i++) {
    rain[i].y += rain[i].ySpeed;

    if (rain[i].y > 1000) {
      rain[i].y = -100;
    }
  }
}

// Keyboard control
let lPressed = false;

// Keyboard Events
document.addEventListener("keydown", keydown);

function keydown(event) {
  if (event.code == "KeyL") {
    lPressed = true;
  }
}

document.addEventListener("keyup", keyup);

function keyup(event) {
  if (event.code == "KeyL") {
    lPressed = false;
  }
}

// Savanna deserves 1/4 of the credit for the animation of the waves
