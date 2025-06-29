# Tetris

## How to Play

This game is hosted at https://hawksley.dev/tetris

Use the left and right arrow keys to move the piece. Use the down arrow key to accelerate the piece falling. Use the up arrow key to rotate the piece.

## How to Build

Download the NPM package manager for JavaScript.

https://www.npmjs.com/

Clone this repository.

Navigate to the directory and run `npm install`. This installs the TypeScript dependency.

Then, run `npx tsc` to build the TypeScript into JavaScript for the browser to run.

Afterwards, deploy onto your static site host of choice.

If running locally, make sure to access the site over http or https. You can do this by running `npx serve .` to host the site locally. Then simply navigate to the corresponding URL.
