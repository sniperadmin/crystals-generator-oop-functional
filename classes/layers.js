/**
 * @class
 * @classdesc defines a layer that contains shared props
 */
class Layer {
  constructor() {
    this.sides = SIDES;
    this.numShapes = this.sides;
    this.angle = 360 / this.numShapes;
    this.stepsOut = 8;
    this.oneStep = CRYSTAL_SIZE / 2 / this.stepsOut;
    this.thinStroke = 1;
    this.thickStroke = 3;
    this.strokeColor = getRandomColorFromPalette();
  }
}

class Circles extends Layer {
  constructor() {
    super(); // go get things from crystal :D
    this.shapeSize = (CRYSTAL_SIZE / 2) * 0.93;
    this.position = CRYSTAL_SIZE / 2 - this.shapeSize / 2;
  }

  render() {
    noFill();
    stroke(this.strokeColor);
    strokeWeight(1);

    push();
    // translate(width / 2, height / 2)
    for (let i = 0; i <= this.numShapes; i++) {
      ellipse(this.position, 0, this.shapeSize, this.shapeSize);
      rotate(this.angle);
    }
    pop();
  }
}

class SimpleLines extends Layer {
  constructor() {
    super();
    this.numSteps = randomSelectTwo()
      ? this.stepsOut
      : int(this.stepsOut * 1.25);
    this.oneStep = CRYSTAL_SIZE / 2 / this.numSteps;
    this.startPoint = floor(random(0, this.numSteps));
    this.endPoint = floor(random(this.startPoint, this.numSteps + 1));
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;
  }

  render() {
    noFill();
    stroke(this.strokeColor);
    strokeWeight(this.weight);

    // SECTION: push pop isolates what's in between
    push();
    // translate(width / 2, height / 2)

    for (let i = 0; i < this.numShapes; i++) {
      line(this.startPoint * this.oneStep, 0, this.endPoint * this.oneStep, 0);
      rotate(this.angle);
    }
    pop();
    // SECTION
  }
}

class OutlineShape extends Layer {
  constructor() {
    super();
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.needHexagon = randomSelectTwo();
  }

  render() {
    noFill();
    push();
    // translate(width / 2, height / 2)
    if (this.needHexagon) {
      createHexagon(0, 0, CRYSTAL_SIZE / 2);
    } else {
      ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
    }
    pop();
  }
}

class DottedLines extends Layer {
  constructor() {
    super();
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numShapes;
    this.shapeSize = 3;
    this.centerOffset = this.oneStep;
  }

  render() {
    fill(this.strokeColor);
    noStroke();
    push();
    // translate(width / 2, height / 2)
    for (let i = 0; i < this.numShapes; i++) {
      for (let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.oneStep) {
        rect(x, 0, this.shapeSize, this.shapeSize);
      }
      rotate(this.angle);
    }
    pop();
  }
}

class CenteredShape extends Layer {
  constructor() {
    super();
    this.randomShape = random(1);
    this.shapeSize =
      floor(random(this.stepsOut / 2, this.stepsOut)) * this.oneStep;
  }

  render() {
    fill(this.strokeColor);
    noStroke();
    rectMode(CENTER);

    push();
    // translate(width / 2, height / 2)
    if (this.randomShape < 0.1) {
      rect(0, 0, this.shapeSize * 2, this.shapeSize * 2);
    } else if (this.randomShape >= 0.1 && this.randomShape < 0.6) {
      ellipse(0, 0, this.shapeSize * 2, this.shapeSize * 2);
    } else if (this.randomShape >= 0.6) {
      rotate(this.angle / 2);
      createHexagon(0, 0, this.shapeSize);
    }
    pop();
  }
}

class RingOfShapes extends Layer {
  constructor() {
    super();
    this.steps = floor(random(1, this.stepsOut));
    this.center = this.steps * this.oneStep;
    this.randomShape = random(1);
    this.direction = randomSelectTwo();
    this.fillColor = randomSelectTwo() ? this.strokeColor : color(0, 1);
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;

    /**
     * If shapes are drawn at the main circle edge
     * we need to make sure that the radii are not exceeding
     * limits
     */
    if (this.steps < this.stepsOut / 2) {
      this.radius = floor(random(1, this.steps)) * this.oneStep;
    } else if (this.steps > this.stepsOut / 2) {
      this.radius = floor(random(1, this.stepsOut - this.steps)) * this.oneStep;
    } else {
      this.radius = floor(random(1, this.stepsOut / 2) + 1) * this.oneStep;
    }
  }

  render() {
    stroke(this.strokeColor);
    fill(this.fillColor);
    strokeWeight(this.weight);

    push();
    // translate(width / 2, height / 2)
    for (let i = 0; i < this.numShapes; i++) {
      if (this.randomShape < 0.33) {
        ellipse(0, this.center, this.radius, this.radius);
      } else if (this.randomShape >= 0.33 && this.randomShape < 0.66) {
        rect(0, this.center, this.radius, this.radius);
      } else if (this.randomShape >= 0.66) {
        createTriangle(this.center, this.radius, this.direction);
      }
      rotate(this.angle);
    }
    pop();
  }
}

class SteppedHexagons extends Layer {
  constructor() {
    super();
    this.numSteps = randomSelectTwo() ? this.stepsOut : this.stepsOut * 1.25;
    this.centerOffset = (CRYSTAL_SIZE / 2) * 0.15;
    this.oneStep = (CRYSTAL_SIZE / 2 - this.centerOffset) / this.numSteps;
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
  }

  render() {
    stroke(this.strokeColor);
    noFill();
    strokeWeight(this.weight);

    push();
    // translate(width / 2, height / 2)
    rotate(this.angle / 2);
    for (let i = 0; i < this.numSteps + 1; i++) {
      createHexagon(0, 0, this.centerOffset + i * this.oneStep);
    }
    pop();
  }
}
