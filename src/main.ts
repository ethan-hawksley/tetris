import { Playfield } from './Playfield.js';
import { Tetromino } from './Tetromino.js';

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Missing canvas');
const context = canvas.getContext('2d');
if (!(context instanceof CanvasRenderingContext2D))
  throw new Error('Missing context');
const ctx = context as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const keys: Record<string, boolean> = {};
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

const playfield = new Playfield();
let tetromino = new Tetromino();

let lastTimestamp = performance.now();
let delta = 0;
let active = true;

document.addEventListener('visibilitychange', () => {
  delta = 0;
  lastTimestamp = performance.now();
});

function gameLoop() {
  const now = performance.now();
  delta += now - lastTimestamp;

  if (delta > 500) {
    delta -= 500;
    const success = tetromino.attemptMove('down', playfield);
    if (!success) {
      active = tetromino.place(playfield);
      playfield.clearLines();
      tetromino = new Tetromino();
    }
  } else {
    if (delta > 100 && keys['ArrowDown']) {
      delta = 0;
      const success = tetromino.attemptMove('down', playfield);
      if (!success) {
        active = tetromino.place(playfield);
        playfield.clearLines();
        tetromino = new Tetromino();
      }
    }
    if (delta > 100 && keys['ArrowLeft']) {
      delta = 0;
      tetromino.attemptMove('left', playfield);
    }
    if (delta > 100 && keys['ArrowRight']) {
      delta = 0;
      tetromino.attemptMove('right', playfield);
    }
    if (delta > 150 && keys['ArrowUp']) {
      delta = 0;
      tetromino.attemptMove('rotate', playfield);
    }
  }

  render();

  lastTimestamp = now;
  if (active) {
    requestAnimationFrame(gameLoop);
  } else {
    alert('Game over!');
  }
}

function render() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 10, 20);
  playfield.render(ctx);
  tetromino.render(ctx);
}

gameLoop();
