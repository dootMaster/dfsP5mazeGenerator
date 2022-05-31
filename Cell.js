class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = {
      north: true,
      east: true,
      south: true,
      west: true,
    }
    this.counter = 0;
  }

  show() {
    const w = gridWidth;
    let x = this.x * w;
    let y = this.y * w;
    stroke(0);
    if(this.walls.north) line(x, y, (x + w), y);
    if(this.walls.east) line((x + w), y, (x + w), (y + w));
    if(this.walls.south) line((x + w), (y + w), x, (y + w));
    if(this.walls.west) line(x, (y + w), x, y);

    if(this.visited) {
      noStroke()
      fill(10, 200, 150, 100);
      rect(x, y, w, w);
      // fill(255, 255, 255)
      // text(this.counter.toString(), x + 30, y + 30)
    }
  }

  checkNeighbors() {
    let possibleNext = [];
    let x = this.x;
    let y = this.y;
    let north = grid[getIndex(x, y - 1)];
    let east = grid[getIndex(x + 1, y)];
    let south = grid[getIndex(x, y + 1)];
    let west = grid[getIndex(x - 1, y)];

    let neighbors = [north, east, south, west];

    for(let i = 0; i < neighbors.length; i++) {
      if(neighbors[i] && !neighbors[i].visited) {
        possibleNext.push(neighbors[i]);
      }
    }

    if(possibleNext.length > 0) {
      let r = Math.floor(Math.random() * possibleNext.length);
      return possibleNext[r];
    } else {
      return undefined;
    }
  }

  highlight() {
    const w = gridWidth;
    let x = this.x * w;
    let y = this.y * w;

    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  };
}