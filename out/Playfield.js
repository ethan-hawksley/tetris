export class Playfield {
    constructor() {
        this.grid = [];
        for (let row = 0; row < 20; row++) {
            this.grid.push(new Array(10).fill(null));
        }
    }
    isOccupied(x, y) {
        if (y >= 20)
            return false;
        if (y < 0 || x < 0 || x >= 10)
            return true;
        return !!this.grid[y][x];
    }
    clearLines() {
        let fullLines = 0;
        const newGrid = [];
        for (const line of this.grid) {
            if (line.includes(null)) {
                newGrid.push(line);
            }
            else {
                fullLines++;
            }
        }
        this.grid = newGrid;
        for (let i = 0; i < fullLines; i++) {
            this.grid.push(new Array(10).fill(null));
        }
        return fullLines;
    }
    render(ctx) {
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
