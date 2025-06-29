import { Playfield } from './Playfield.js';
import {
  tetrominos,
  TetrominoType,
  TetrominoShape,
} from './tetrominoShapes.js';

export type Direction = 'left' | 'down' | 'right' | 'rotate';

export class Tetromino {
  type: TetrominoType;
  pieceShapes: TetrominoShape[];
  rotation: number;
  piece: TetrominoShape;
  x: number;
  y: number;

  constructor() {
    const types = Object.keys(tetrominos) as TetrominoType[];
    const randomIndex = Math.floor(Math.random() * types.length);
    this.type = types[randomIndex];
    this.pieceShapes = tetrominos[this.type];
    this.rotation = 0;
    this.piece = this.pieceShapes[this.rotation];

    this.x = 4;
    this.y = 19;
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let dx = 0; dx < 4; dx++) {
      for (let dy = 0; dy < 4; dy++) {
        const colour = this.piece[dy][dx];
        if (colour) {
          ctx.fillStyle = colour;
          ctx.fillRect(this.x + dx, 19 - this.y - dy, 1, 1);
        }
      }
    }
  }

  isColliding(playfield: Playfield) {
    for (let dx = 0; dx < 4; dx++) {
      for (let dy = 0; dy < 4; dy++) {
        if (
          playfield.isOccupied(this.x + dx, this.y + dy) &&
          this.piece[dy][dx]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  attemptMove(direction: Direction, playfield: Playfield) {
    const dx = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
    const dy = direction === 'down' ? -1 : 0;
    this.x += dx;
    this.y += dy;
    if (direction === 'rotate') {
      this.rotation++;
      if (this.rotation >= 4) this.rotation = 0;
      this.piece = this.pieceShapes[this.rotation];
    }
    if (this.isColliding(playfield)) {
      this.x -= dx;
      this.y -= dy;
      if (direction === 'rotate') {
        this.rotation--;
        if (this.rotation < 0) this.rotation = 3;
        this.piece = this.pieceShapes[this.rotation];
      }
      return false;
    }
    return true;
  }

  place(playfield: Playfield) {
    let success = true;
    for (let dx = 0; dx < 4; dx++) {
      for (let dy = 0; dy < 4; dy++) {
        const colour = this.piece[dy][dx];
        if (colour)
          if (
            this.x + dx >= 0 &&
            this.x + dx < 10 &&
            this.y + dy >= 0 &&
            this.y + dy < 20
          ) {
            playfield.grid[this.y + dy][this.x + dx] = colour;
          } else {
            success = false;
          }
      }
    }
    return success;
  }
}
