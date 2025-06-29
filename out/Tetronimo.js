import { tetronimos } from './tetronimos.js';
export class Tetronimo {
    constructor() {
        const types = Object.keys(tetronimos);
        const randomIndex = Math.floor(Math.random() * types.length);
        this.pieceType = types[randomIndex];
        this.pieceShapes = tetronimos[this.pieceType];
        this.rotation = 0;
        this.piece = this.pieceShapes[this.rotation];
        console.log('constructed', this.piece);
    }
    renderPiece(ctx, x, y) {
        console.log(this.piece);
        for (let dx = 0; dx < 4; dx++) {
            for (let dy = 0; dy < 4; dy++) {
                if (this.piece[dy][dx]) {
                    ctx.fillRect(x + dx, 19 - y - dy, 1, 1);
                }
            }
        }
    }
}
