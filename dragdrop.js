// get canvas related references
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BB = canvas.getBoundingClientRect();
const offsetX = BB.left;
const offsetY = BB.top;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// drag related variables
let dragok = false;
let startX;
let startY;

// an array of objects that define different rectangles
const rects = [];
rects.push({
  x: 75 - 15,
  y: 50 - 15,
  width: 30,
  height: 30,
  fill: '#444444',
  isDragging: false,
});
rects.push({
  x: 75 - 25,
  y: 50 - 25,
  width: 30,
  height: 30,
  fill: '#ff550d',
  isDragging: false,
});
rects.push({
  x: 75 - 35,
  y: 50 - 35,
  width: 30,
  height: 30,
  fill: '#800080',
  isDragging: false,
});
rects.push({
  x: 75 - 45,
  y: 50 - 45,
  width: 30,
  height: 30,
  fill: '#0c64e8',
  isDragging: false,
});

// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

// call to draw the scene
draw();

// draw a single rect
function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function draw() {
  clear();
  ctx.fillStyle = '#FAF7F8';
  rect(0, 0, WIDTH, HEIGHT);
  // redraw each rect in the rects[] array
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    ctx.fillStyle = r.fill;
    rect(r.x, r.y, r.width, r.height);
  }
}

// handle mousedown events
function myDown(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  const mx = parseInt(e.clientX - offsetX);
  const my = parseInt(e.clientY - offsetY);

  // test each rect to see if mouse is inside
  dragok = false;
  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
      // if yes, set that rects isDragging=true
      dragok = true;
      r.isDragging = true;
    }
  }
  // save the current mouse position
  startX = mx;
  startY = my;
}

// handle mouseup events
function myUp(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for (let i = 0; i < rects.length; i++) {
    rects[i].isDragging = false;
  }
}

// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = parseInt(e.clientX - offsetX);
    const my = parseInt(e.clientY - offsetY);

    // calculate the distance the mouse has moved
    // since the last mousemove
    const dx = mx - startX;
    const dy = my - startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (r.isDragging) {
        r.x += dx;
        r.y += dy;
      }
    }

    // redraw the scene with the new rect positions
    draw();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;
  }
}
