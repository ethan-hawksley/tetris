import { Playfield } from './Playfield.js';
import { Tetromino } from './Tetromino.js';

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Missing canvas');
const context = canvas.getContext('2d');
if (!(context instanceof CanvasRenderingContext2D))
  throw new Error('Missing context');
const ctx = context as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const playfield = new Playfield();
let tetromino = new Tetromino();

let lastTimestamp = performance.now();
let delta = 0;

function gameLoop() {
  const now = performance.now();
  delta += now - lastTimestamp;

  if (delta > 500) {
    delta -= 500;
    const success = tetromino.attemptMove('down', playfield);
    if (!success) {
      tetromino.place(playfield);
      tetromino = new Tetromino();
    }
  }

  render();

  lastTimestamp = now;
  requestAnimationFrame(gameLoop);
}

function render() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 10, 20);
  playfield.render(ctx);
  tetromino.render(ctx);
}

gameLoop();
