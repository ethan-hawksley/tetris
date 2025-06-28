import { Tetromino } from './Tetromino.js';

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Missing canvas');
const context = canvas.getContext('2d');
if (!(context instanceof CanvasRenderingContext2D))
  throw new Error('Missing context');
const ctx = context as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const tetromino = new Tetromino();

let lastTimestamp = performance.now();
let delta = 0;

function render() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 10, 20);
  tetromino.render(ctx);
}

function gameLoop() {
  const now = performance.now();
  delta += now - lastTimestamp;

  if (delta > 500) {
    delta -= 500;
    tetromino.y--;
  }

  render();

  lastTimestamp = now;
  console.log(delta);
  requestAnimationFrame(gameLoop);
}

gameLoop();
