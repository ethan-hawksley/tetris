import { Playfield } from './Playfield.js';
import { Tetromino } from './Tetromino.js';

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Missing canvas');
const context = canvas.getContext('2d');
if (!(context instanceof CanvasRenderingContext2D))
  throw new Error('Missing context');
const ctx = context as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;
const scoreElement = document.getElementById('score') as HTMLSpanElement;
if (!(scoreElement instanceof HTMLSpanElement))
  throw new Error('Missing scoreElement');

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

let score = 0;

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
      score += Math.floor(Math.pow(playfield.clearLines() * 10, 1.5));
      tetromino = new Tetromino();
    }
  } else {
    if (delta > 100 && keys['ArrowDown']) {
      delta = 0;
      const success = tetromino.attemptMove('down', playfield);
      if (!success) {
        active = tetromino.place(playfield);
        score += Math.floor(Math.pow(playfield.clearLines() * 10, 1.5));
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
    setTimeout(() => {
      alert('Game over!');
    }, 50);
  }
}

function render() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 10, 20);
  playfield.render(ctx);
  tetromino.render(ctx);
  scoreElement.textContent = `Score: ${score}`;
}

gameLoop();
