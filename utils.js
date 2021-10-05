/**
 * @function createHexagon
 * @param {number} posX
 * @param {number} posY
 * @param {number} radius
 *
 * All methods in this function use p5.js helpers
 * for drawing
 */
function createHexagon(posX, posY, radius) {
  const rotationAngle = 360 / 6;
  beginShape();
  for (let i = 0; i < 6; i++) {
    const hexVertex = pickPointOnCircle(posX, posY, radius, i * rotationAngle);
    vertex(hexVertex.x, hexVertex.y);
  }
  endShape(CLOSE);
}

/**
 * @function createTriangle
 * @param {number} center
 * @param {number} radius
 * @param {boolean} direction
 */
function createTriangle(center, radius, direction) {
  if (direction) {
    beginShape();
    vertex(center + radius * cos(0), radius * sin(0));
    vertex(center + radius * cos(120), radius * sin(120));
    vertex(center + radius * cos(240), radius * sin(240));
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(center + radius * cos(180), radius * sin(180));
    vertex(center + radius * cos(300), radius * sin(300));
    vertex(center + radius * cos(60), radius * sin(60));
    endShape(CLOSE);
  }
}

/**
 * @function pickPointOnCircle => defines a specific point on the
 * outline circle to start drawing accordingly
 *
 * @param {number} posX
 * @param {number} posY
 * @param {number} radius
 * @param {number} angle
 *
 * @returns {object} with x and y coordinates
 */
function pickPointOnCircle(posX, posY, radius, angle) {
  const x = posX + radius * cos(angle);
  const y = posY + radius * sin(angle);

  return createVector(x, y);
}

/**
 * @function randomSelectTwo => probability function returns boolean
 * @returns {boolean}
 */
function randomSelectTwo() {
  const rand = random(1);
  if (rand > 0.5) {
    return true;
  } else {
    return false;
  }
}

/**
 * @function getRandomColorFromPalette
 * @returns {string}
 */
function getRandomColorFromPalette() {
  const rand2 = floor(random(0, PALETTE.length));
  return PALETTE[rand2];
}

/**
 * @function makeCrystalFunction
 *
 * @param {{x, y}} pos => passed coordinates object
 *
 * @returns {object[]} Array of layers
 */
const makeCrystalFunction = (pos) => {
  // check layerConstructors in ./script.js for details
  const layers = layerConstructors.map((layer) => {
    let picker = random(1);

    const draw = picker > layer.weight;
    // const draw = layer.name === 'Test frame';

    return layer.init({
      pos,
      draw,
    });
  });

  return layers;
};

/**
 * @function drawCrystalFunction
 * calls render function in the layer to draw it
 *
 * @param {object[]} crystal => array of layers
 */
const drawCrystalFunction = (crystal) => {
  crystal.forEach((layer) => {
    push();
    translate(layer.state.pos.x, layer.state.pos.y);
    !!layer.state.draw ? layer.render() : false;
    pop();
  });
};
