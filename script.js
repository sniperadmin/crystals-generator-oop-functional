/**
 * @file main file
 * Definitions and drawings are defined here
 *
 *
 * you can check ./utils for helper functions
 * ./functional-layers.js => for the functional definitions
 * ./classes for OOP definitions
 */

/** Shape definitions
 * @var CRYSTAL_SIZE => defines each crystal size in pixles
 * @var SIDES => defines the number of sides per shape
 */
const CRYSTAL_SIZE = 150;
const SIDES = 6;

let radio;

/** you can change this manually
 * @var functional => choosing between functional or
 * OOP programmed crystals
 * Both are having same results
 *
 * for OOP, the app uses classes from the ./classes dir
 * for functional, tha app uses ./functional-layers.js definitions
 */
let functional = true;

/**
 * @var {[{string, function, number}]} layerConstructors => a data structure designed
 * to define each crystal constructor with initializer
 *
 * @property {string} name => name of the constructor
 * @property {function} init => creates the shape
 * @property {number} weight => defines probability or density of drawing this shape %
 */
const layerConstructors = [
  {
    name: 'Outline Shape',
    init: functional
      ? (props) => outlineShape({ ...props, ...setState(state) })
      : () => new OutlineShape(),
    weight: 0.3,
  },
  {
    name: 'Simple Lines',
    init: functional
      ? (props) => simpleLines({ ...props, ...setState(state) })
      : () => new SimpleLines(),
    weight: 0.3,
  },
  {
    name: 'Circles',
    init: functional
      ? (props) => circles({ ...props, ...setState(state) })
      : () => new Circles(),
    weight: 0.2,
  },
  {
    name: 'Dotted Lines',
    init: functional
      ? (props) => dottedLines({ ...props, ...setState(state) })
      : () => new DottedLines(),
    weight: 0.4,
  },
  {
    name: 'Centered Shape',
    init: functional
      ? (props) => centeredShape({ ...props, ...setState(state) })
      : () => new CenteredShape(),
    weight: 0.9,
  },
  {
    name: 'RingOf Shapes',
    init: functional
      ? (props) => ringOfShapes({ ...props, ...setState(state) })
      : () => new RingOfShapes(),
    weight: 0.2,
  },
  {
    name: 'Stepped Hexagons',
    init: functional
      ? (props) => steppedHexagons({ ...props, ...setState(state) })
      : () => new SteppedHexagons(),
    weight: 0.7,
  },
];

/** Main Layout
 * @var {number} ROWS => number of rows in the grid
 * @var {number} COLUMNS => number of columns in the grid
 * @var {number} MARGIN => margin we need to add between each grid cell
 * @var {number} PADDING => padding we need to add each grid cell
 * @var {number} GRIDBOX => defining grid cell/box
 * @var {number} START => starting point of drawing (should be in the center of each grid)
 */
const ROWS = 4;
const COLUMNS = 3;
const MARGIN = CRYSTAL_SIZE / 2;
const PADDING = CRYSTAL_SIZE * 0.2;
const GRIDBOX = CRYSTAL_SIZE + PADDING;
const START = CRYSTAL_SIZE / 2 + MARGIN;

// To be altered and used
let ALL_CRYSTALS = [];
let PALETTE = [];

/** Setting up scene using p5.js
 * @function setup
 */
function setup() {
  const totalX = START + GRIDBOX * COLUMNS;
  const totalY = START + GRIDBOX * ROWS;

  createCanvas(totalX, totalY, SVG);

  PALETTE = [color(255, 52, 154), color(4, 0, 152)];

  noLoop();
  angleMode(DEGREES);
}

/** start drawing using p5.js
 * @function draw
 */
function draw() {
  if (!functional) {
    for (let x = 0; x < COLUMNS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const posX = START + x * GRIDBOX;
        const posY = START + y * GRIDBOX;
        ALL_CRYSTALS.push(new Crystal(posX, posY));
      }
    }
    ALL_CRYSTALS.forEach((crystal) => {
      crystal.render();
    });
  } else {
    for (let x = 0; x < COLUMNS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const posX = START + x * GRIDBOX;
        const posY = START + y * GRIDBOX;
        const crystal = makeCrystalFunction({ x: posX, y: posY });

        ALL_CRYSTALS.push(crystal);
      }
    }
    ALL_CRYSTALS.forEach((crystal) => {
      drawCrystalFunction(crystal);
    });
  }
}

/**
 * @function redrawCrystals
 */
function redrawCrystals() {
  // console.log(ALL_CRYSTALS);
  // redraw();
  window.location.reload();
}
