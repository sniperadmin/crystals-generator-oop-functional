/**
 * @class
 * @classdesc creates and renders a crystal
 * using layerConstructors in ./script.js
 */
class Crystal {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.layers = [];

    layerConstructors.forEach((layer) => {
      let picker = random(1);
      if (picker > layer.weight) {
        this.layers.push(layer.init());
      }
    });
  }

  render() {
    push();
    translate(this.x, this.y);
    this.layers.forEach((layer) => layer.render());
    pop();
  }
}
