import { Playfield } from './Playfield.js';
import { Tetromino } from './Tetromino.js';
import { tetrominos, TetrominoType } from './tetrominoShapes.js';

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Missing canvas');
const context = canvas.getContext('2d');
if (!(context instanceof CanvasRenderingContext2D))
  throw new Error('Missing context');
const ctx = context as CanvasRenderingContext2D;
ctx.imageSmoothingEnabled = false;

const nextPieceCanvas = document.getElementById('next-piece-canvas');
if (!(nextPieceCanvas instanceof HTMLCanvasElement))
  throw new Error('Missing nextPieceCanvas');
const nextPieceContext = nextPieceCanvas.getContext('2d');
if (!(nextPieceContext instanceof CanvasRenderingContext2D))
  throw new Error('Missing nextPieceContext');
const nextPieceCtx = nextPieceContext as CanvasRenderingContext2D;
nextPieceCtx.imageSmoothingEnabled = false;

const scoreElement = document.getElementById('score') as HTMLSpanElement;
if (!(scoreElement instanceof HTMLSpanElement))
  throw new Error('Missing scoreElement');

const replayButton = document.getElementById('replay');
if (!(replayButton instanceof HTMLButtonElement))
  throw new Error('Missing replayButton');

let keys: Record<string, boolean> = {};
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

let playfield = new Playfield();
let tetromino = new Tetromino(generateRandomType());

let nextType = generateRandomType();
let nextPieceTetromino = new Tetromino(nextType);
nextPieceTetromino.x = 0;
nextPieceTetromino.y = 17;
nextPieceTetromino.render(nextPieceCtx);

let lastTimestamp = performance.now();
let delta = 0;
let active = true;

let score = 0;

const backgroundAudio = new Audio('static/Korobeiniki.ogg');
backgroundAudio.loop = true;
backgroundAudio.addEventListener('loadeddata', () => {
  backgroundAudio.play();
});

const muteButton = document.getElementById('mute');
if (!(muteButton instanceof HTMLButtonElement))
  throw new Error('Missing muteButton');
muteButton.addEventListener('click', () => {
  if (backgroundAudio.paused) {
    backgroundAudio.play();
    muteButton.textContent = 'Mute';
  } else {
    backgroundAudio.pause();
    muteButton.textContent = 'Unmute';
  }
});

document.addEventListener('visibilitychange', () => {
  delta = 0;
  lastTimestamp = performance.now();
});

replayButton.addEventListener('click', () => {
  playfield = new Playfield();
  tetromino = new Tetromino(generateRandomType());

  nextType = generateRandomType();
  nextPieceTetromino = new Tetromino(nextType);
  nextPieceTetromino.x = 0;
  nextPieceTetromino.y = 17;

  lastTimestamp = performance.now();
  delta = 0;
  keys = {};

  score = 0;
  scoreElement.textContent = 'Score: 0';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nextPieceCtx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
  nextPieceTetromino.render(nextPieceCtx);
  if (!active) {
    active = true;
    gameLoop();
  }
});

function gameLoop() {
  console.log('loop');
  const now = performance.now();
  delta += now - lastTimestamp;

  if (delta > 500) {
    delta -= 500;
    const success = tetromino.attemptMove('down', playfield);
    if (!success) {
      placeTetromino();
    }
  } else {
    if (delta > 100 && keys['ArrowDown']) {
      delta = 0;
      const success = tetromino.attemptMove('down', playfield);
      if (!success) {
        placeTetromino();
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

function placeTetromino() {
  const POINTS: Record<number, number> = {
    1: 100,
    2: 600,
    3: 1500,
    4: 2400,
  };

  active = tetromino.place(playfield);
  const linesCleared = playfield.clearLines();
  if (linesCleared in POINTS) {
    score += POINTS[linesCleared];
  } else {
    score += linesCleared * 100;
  }
  tetromino = new Tetromino(nextType);
  nextPieceCtx.fillStyle = '#fff';
  nextPieceCtx.fillRect(0, 0, 5, 5);

  nextType = generateRandomType();
  nextPieceTetromino = new Tetromino(nextType);
  nextPieceTetromino.x = 0;
  nextPieceTetromino.y = 17;
  nextPieceTetromino.render(nextPieceCtx);
}

function generateRandomType() {
  const types = Object.keys(tetrominos) as TetrominoType[];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

function render() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 10, 20);
  playfield.render(ctx);
  tetromino.render(ctx);
  scoreElement.textContent = `Score: ${score}`;
}

gameLoop();
