# mahjong-solvable-deal

A dependency-free JavaScript engine for mahjong solitaire boards whose deals can always be finished. It is the engine behind [Mahjong Bay](https://mahjongbay.com/), extracted as is: no build step, no framework, one file.

What it does:

- describes layouts on a half-tile grid, with 16 layouts included (Turtle, Pyramid, Fortress, Crab, Arena, Bridge, Cat, Dragon, Harbor, Three Sails, and six seasonal shapes);
- tells you which tiles are free (nothing on top, an open left or right side);
- deals tiles so that at least one winning sequence exists;
- re-deals the tiles left on a board, keeping the guarantee;
- lists every pair that can be taken right now (for hints and stuck detection);
- gives you a seeded random generator, so a date can produce the same board for everyone.

Rendering, input and scoring are not included. The engine knows nothing about the DOM.

## Why "solvable" needs an algorithm

Put 144 tiles on a Turtle at random and some of those boards cannot be cleared by anyone, because two tiles of the same face end up stacked on each other with no third copy left, or the last pair is sealed under the top of the pile. The usual fix is to let the player shuffle out of it. This engine avoids the problem at the source.

A deal is built by playing the game backwards. Start with the full layout and no faces. Pick two positions that are free right now, write a matching pair of faces onto them, lift them off, repeat until nothing is left. The order in which the positions were lifted is, reversed, an order in which the finished board can be taken apart, so the board has a solution by construction. The player can still get stuck by taking the wrong two of four identical tiles; the deal itself is never at fault.

The same routine runs on a partially cleared board to shuffle it: the remaining faces are regrouped into pairs and dealt again into the remaining positions. If the remaining positions themselves cannot be lifted in any order (for example two tiles directly on top of each other and nothing else), the shuffle reports that instead of pretending.

## Install

Copy `engine.js`. It exposes `MBEngine` on `window` in a browser and on `module.exports` in Node:

```html
<script src="engine.js"></script>
<script>
  var E = MBEngine;
</script>
```

```js
const { MBEngine: E } = require('./engine.js');
```

## Usage

```js
const E = MBEngine;

// Positions of a layout: [{x, y, z}, ...] in half-tile units
const pos = E.expand(E.LAYOUTS.turtle);
const idx = E.buildIndex(pos);

// A fresh, solvable deal: an array of face ids, one per position
const faces = E.newDeal('turtle');

// Which tiles are on the board
const present = pos.map(() => 1);

// Is position i free?
E.isFree(i, pos, idx, present);

// All free positions
E.freeList(pos, idx, present);

// Every pair that can be taken now: [[i, j], ...]
E.openPairs(pos, idx, present, faces);

// Take a pair
present[i] = 0; present[j] = 0;

// Shuffle what is left (returns a new faces array, or null if no arrangement helps)
const reshuffled = E.redeal(pos, idx, present, faces);

// Two tiles match when their match keys are equal
E.matchKey(faces[i]) === E.matchKey(faces[j]);

// The same board for everyone on a given day
const rnd = E.seeded(20261012);
const daily = E.newDeal('turtle', rnd);
```

### Faces

Face ids are integers:

| ids | tiles |
|---|---|
| 0-8 | dots 1-9 |
| 9-17 | bamboo 1-9 |
| 18-26 | characters 1-9 |
| 27-30 | winds east, south, west, north |
| 31-33 | dragons red, green, white |
| 34-37 | flowers plum, orchid, chrysanthemum, bamboo |
| 38-41 | seasons spring, summer, autumn, winter |

Every suit and honour face exists four times in a full set; flowers and seasons once each. `matchKey` maps all four flowers to one key and all four seasons to another, because they pair with each other. A deal always includes the eight bonus tiles when the layout has room for them, and fills the rest with random pairs from the 68 suit and honour pairs.

### Layouts

A layout is either a list of runs or a map of strings. Coordinates are half tiles: a tile covers a 2 by 2 block of cells, so `x + 2` is the next tile in a row and `x + 1` is a tile shifted by half its width. `z` is the layer.

Runs: `[z, y, xStart, count]` places `count` tiles in a row. `singles` adds `[x, y, z]` one at a time.

```js
harbor: { name: 'Harbor', note: '72 tiles', runs: [[0, 0, 0, 4], ...], singles: [] }
```

Maps: one array of strings per layer, one string per row, `#` marks the top-left cell of a tile.

```js
pyramid: { name: 'Pyramid', map: [
  ['# # # # #', '', '# # # # #'],   // layer 0: two rows of five tiles
  ['', ' # # # #']                  // layer 1: four tiles, shifted half a tile down and right
] }
```

A tile on a higher layer should be fully supported by tiles below it; the engine does not check this, the test script does.

### Layout statistics

For each included layout, `test.js` deals 400 boards and plays each one by taking a random legal pair until none is left. "Lost by random play" is how often that careless player gets stuck. Every one of those boards had a solution; the number measures how much the shape punishes a wrong order of moves.

| layout | tiles | layers | free at start | pairs open at start (avg) | lost by random play |
|---|---|---|---|---|---|
| turtle | 144 | 5 | 35 | 18.1 | 64% |
| harbor | 72 | 3 | 16 | 6.1 | 34% |
| sails | 94 | 4 | 26 | 11.9 | 46% |
| pyramid | 108 | 4 | 26 | 12.3 | 54% |
| fortress | 114 | 3 | 36 | 20.4 | 61% |
| crab | 74 | 3 | 18 | 7.6 | 45% |
| arena | 70 | 3 | 31 | 17.1 | 28% |
| bridge | 72 | 4 | 8 | 2.4 | 31% |
| cat | 68 | 4 | 26 | 13.1 | 29% |
| dragon | 88 | 3 | 26 | 12 | 42% |
| tree | 86 | 4 | 28 | 13.7 | 41% |
| pumpkin | 92 | 4 | 27 | 13 | 44% |
| turkey | 86 | 3 | 26 | 11.9 | 25% |
| leaf | 60 | 3 | 27 | 14.1 | 20% |
| snowman | 78 | 3 | 26 | 12.6 | 37% |
| snowflake | 58 | 3 | 32 | 19.5 | 17% |

## Test

```
node test.js
```

Checks every layout for overlapping tiles, unsupported tiles and an even tile count, deals 400 boards per layout, verifies the face counts, and prints the table above.

## License

MIT. The layouts, the dealing routine and the tests are free to use in your own game. Tile artwork from Mahjong Bay is not part of this repository.
