import { Playfield } from './Playfield.js';
import {
  tetrominos,
  TetrominoType,
  TetrominoShape,
} from './tetrominoShapes.js';

export type Direction = 'left' | 'down' | 'right';

export class Tetromino {
  type: TetrominoType;
  pieceShapes: TetrominoShape[];
  colour: string;
  rotation: number;
  piece: TetrominoShape;
  x: number;
  y: number;

  constructor() {
    const types = Object.keys(tetrominos) as TetrominoType[];
    const randomIndex = Math.floor(Math.random() * types.length);
    this.type = types[randomIndex];
    this.pieceShapes = tetrominos[this.type].shapes;
    this.colour = tetrominos[this.type].colour;
    this.rotation = 0;
    this.piece = this.pieceShapes[this.rotation];

    this.x = 4;
    this.y = 19;

    console.log('constructed', this.piece);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.colour;
    for (let dx = 0; dx < 4; dx++) {
      for (let dy = 0; dy < 4; dy++) {
        if (this.piece[dy][dx]) {
          ctx.fillRect(this.x + dx, 19 - this.y - dy, 1, 1);
        }
      }
    }
  }

  isColliding() {
    return true;
  }

  attemptMove(direction: Direction, playfield: Playfield) {
    const dx = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
    const dy = direction === 'down' ? -1 : 0;
    this.x += dx;
    this.y += dy;
  }
}
