import {
  tetrominos,
  TetrominoType,
  TetrominoShape,
} from './tetrominoShapes.js';

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
    this.y = 19

    console.log('constructed', this.piece);
  }

  render(ctx: CanvasRenderingContext2D, colour: string) {
    ctx.fillStyle = colour;
    for (let dx = 0; dx < 4; dx++) {
      for (let dy = 0; dy < 4; dy++) {
        if (this.piece[dy][dx]) {
          ctx.fillRect(this.x + dx, 19 - this.y - dy, 1, 1);
        }
      }
    }
  }
  
  isColliding()
}
