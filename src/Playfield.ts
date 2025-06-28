export class Playfield {
  grid;

  constructor() {
    this.grid = [];
    for (let row = 0; row < 20; row++) {
      this.grid.push(new Array(10).fill(0));
    }
    console.log(this.grid);
  }
}
