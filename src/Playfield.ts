export class Playfield {
  grid;

  constructor() {
    this.grid = [];
    for (let row = 0; row < 20; row++) {
      this.grid.push(new Array(10).fill(null));
    }
    console.log(this.grid);
  }

  isOccupied(x: number, y: number) {
    if (y >= 20) return false;
    if (y < 0 || x < 0 || x >= 10) return true;
    return !!this.grid[y][x];
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let dx = 0; dx < 10; dx++) {
      for (let dy = 0; dy < 20; dy++) {
        const colour = this.grid[dy][dx];
        if (colour) {
          ctx.fillStyle = colour;
          ctx.fillRect(dx, 19 - dy, 1, 1);
        }
      }
    }
  }
}
