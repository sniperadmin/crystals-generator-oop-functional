const state = {
  sides: SIDES,
  stepsOut: 8,
  thinStroke: 1,
  thickStroke: 3
}


const setState = (state) => {
  state.numshapes = state.sides
  state.angle = 360 / state.numshapes
  state.oneStep = (CRYSTAL_SIZE / 2) / state.stepsOut
  state.strokeColor = getRandomColorFromPalette()

  return state
}

const circles = (state) => {
  state.shapeSize = (CRYSTAL_SIZE / 2) * 0.93
  state.position = (CRYSTAL_SIZE / 2) - (state.shapeSize / 2)

  return ({
    name: 'circles',
    state,
    render: () => {
      noFill()
      stroke(state.strokeColor)
      strokeWeight(1)

      push()
      for (let i = 0; i < state.numshapes; i++) {
        ellipse(state.position, 0, state.shapeSize, state.shapeSize)
        rotate(state.angle)
      }
      pop()
    }
  })
}


const simpleLines = (state) => {
  state.numSteps = randomSelectTwo() ? state.stepsOut : int(state.stepsOut * 1.25)
  state.oneStep = (CRYSTAL_SIZE / 2) / state.numSteps
  state.startPoint = floor(random(0, state.numSteps))
  state.endPoint = floor(random(state.startPoint, state.numSteps + 1))
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2
  state.angle = 360 / state.numShapes

  return ({
    name: 'simple lines',
    state,
    render: () => {
      noFill()
      stroke(state.strokeColor)
      strokeWeight(state.weight)
  
      // SECTION: push pop isolates what's in between
      push()
      // translate(width / 2, height / 2)
      for (let i = 0; i < state.numShapes; i++) {
        line(state.startPoint * state.oneStep, 0, state.endPoint * state.oneStep, 0)
        rotate(state.angle)
      }
      pop()
      // SECTION
    }
  })
}



const outlineShape = (state) => {
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.needHexagon = randomSelectTwo()

  return ({
    name: 'outline shape',
    state,
    render: () => {
      noFill()
      push()
      // translate(width / 2, height / 2)
      if (state.needHexagon) {
        createHexagon(0, 0, CRYSTAL_SIZE / 2)
      } else {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      }
      pop()
    }
  })
}

const dottedLines = (state) => {
    state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2
    state.angle = 360 / state.numShapes
    state.shapeSize = 3
    state.centerOffset = state.oneStep

    return ({
      name: 'dotted lines',
      state,
      render: () => {
        fill(state.strokeColor)
        noStroke()
        push()
        // translate(width / 2, height / 2)
        for (let i = 0; i < state.numShapes; i++) {
          for (let x = state.centerOffset; x < CRYSTAL_SIZE / 2; x += state.oneStep) {
            rect(x, 0, state.shapeSize, state.shapeSize)
          }
          rotate(state.angle)
        }
        pop()
      }
    })
}


const centeredShape = (state) => {
    state.randomShape = random(1)
    state.shapeSize = floor(random(state.stepsOut / 2, state.stepsOut)) * state.oneStep

    return ({
      name: 'centered shape',
      state,
      render: () => {
        fill(state.strokeColor)
        noStroke()
        rectMode(CENTER)
    
        push()
        // translate(width / 2, height / 2)
        if (state.randomShape < 0.1) {
          rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)
        } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
          ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)
        } else if (state.randomShape >= 0.6) {
          rotate(state.angle / 2)
          createHexagon(0, 0, state.shapeSize)
        }
        pop()
      }
    })
}


const ringOfShapes = (state) => {
    state.steps = floor(random(1, state.stepsOut))
    state.center = state.steps * state.oneStep
    state.randomShape = random(1)
    state.direction = randomSelectTwo()
    state.fillColor = randomSelectTwo() ? state.strokeColor : color(0, 1)
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

    /**
     * If shapes are drawn at the main circle edge
     * we need to make sure that the radii are not exceeding
     * limits
     */
    if (state.steps < state.stepsOut / 2) {
      state.radius = floor(random(1, state.steps)) * state.oneStep
    } else if (state.steps > state.stepsOut / 2) {
      state.radius = floor(random(1, state.stepsOut - state.steps)) * state.oneStep
    } else {
      state.radius = floor(random(1, state.stepsOut / 2) + 1) * state.oneStep
    }

  return ({
    name: 'ring of shapes',
    state,
    render: () => {
      stroke(state.strokeColor)
      fill(state.fillColor)
      strokeWeight(state.weight)
  
      push()
      // translate(width / 2, height / 2)
      for (let i = 0; i < state.numShapes; i++) {
        if (state.randomShape < 0.33) {
          ellipse(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
          rect(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.66) {
          createTriangle(state.center, state.radius, state.direction)
        }
        rotate(state.angle)
      }
      pop()
    }
  })
}


const steppedHexagons = (state) => {
    state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25
    state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
    state.oneStep = ((CRYSTAL_SIZE / 2) - state.centerOffset) / state.numSteps
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

  return ({
    name: 'stepped hexagons',
    state,
    render: () => {
      stroke(state.strokeColor)
      noFill()
      strokeWeight(state.weight)
  
      push()
      // translate(width / 2, height / 2)
      rotate(state.angle / 2)
      for (let i = 0; i < state.numSteps + 1; i++) {
        createHexagon(0, 0, state.centerOffset + (i * state.oneStep))
      }
      pop()
    }
  })
}


/**
 * @function testFrame
 * draws a test wireframe of lines and outline circle
 *
 *
 * All methods in this function use p5.js helpers
 * for drawing
 */
 const testFrame = (state) => {
  let numShapes = randomSelectTwo() ? SIDES : SIDES * 2;
  const strokeColor = getRandomColorFromPalette();

  return ({
    name: 'Test frame',
    state,
    render: () => {
      noFill();
      stroke(PALETTE[0]);
      console.log(state.outlineCircle)
      push();
      if (state.outlineCircle) {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
      }

      stroke(strokeColor);
      if (state.lines) {
        let angle = 360 / numShapes;
        for (let i = 0; i < numShapes; i++) {
          line(0, 0, 0, CRYSTAL_SIZE / 2);
          rotate(angle);
        }
      }
      pop();
    }
  })
}
