let collumns, rows;
const gridWidth = 20;
let grid = [];
let current;
let gradient = 0;
let counter = 1;
let stack = [];
let canvasSize = 800

function setup() {
  grid = [];
	createCanvas(canvasSize, canvasSize);
  collumns = floor(width/gridWidth);
  rows = floor(height/gridWidth);

  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < collumns; x++) {
      let cell = new Cell(x, y);
      grid.push(cell);
    }
  }
  current = grid[0];
  // current.counter = counter;
  // counter++;
}

function draw() {
  background(255);

  for(let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.highlight()
  current.visited = true;
  let next = current.checkNeighbors();

  if(next) {
    stack.push(current);
    removeWalls(current, next);
    current = next;
    // if(!current.counter) current.counter += counter;
    // counter++;
  } else if(stack.length){
    current = stack.pop();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const getIndex = (x, y) => {
  let a = x < 0;
  let b = y < 0;
  let c = x > collumns - 1;
  let d = y > rows - 1;
  if(a || b || c || d) return -1;
  return x + y * collumns;
}

const removeWalls = (currentCell, nextCell) => {
  let y = currentCell.y - nextCell.y;
  let x = currentCell.x - nextCell.x;
  switch(y) {
    case 1:
      currentCell.walls.north = false;
      nextCell.walls.south = false;
      break;
    case -1:
      currentCell.walls.south = false;
      nextCell.walls.north = false;
      break;
    default:

  }
  switch(x) {
    case 1:
      currentCell.walls.west = false;
      nextCell.walls.east = false;
      break;
    case -1:
      currentCell.walls.east = false;
      nextCell.walls.west = false;
      break;
  }
}

