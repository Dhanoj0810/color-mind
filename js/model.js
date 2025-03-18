import lodash from "https://cdn.skypack.dev/lodash";

class ColorGame {
  constructor() {
    this.colors = {
      black: "white",
      red: "green",
      blue: "yellow",
      yellow: "blue",
      green: "red",
      purple: "orange",
      orange: "purple",
      pink: "brown",
      brown: "pink",
      gray: "white",
    };

    this.renderedColor = [];
    this.point = 0;
    this.iterations = 0;
    this.maxIterations = 10;
  }

  generateColorCombination() {
    const colorKeys = Object.keys(this.colors);
    const randomColor = colorKeys[lodash.random(colorKeys.length - 1)];

    return [randomColor, this.colors[randomColor]];
  }

  updatePoint() {
    this.point += 1;

    return this.point;
  }

  addPresentColor([key, value]) {
    this.renderedColor.push({ [key]: value });

    return key;
  }

  #findIndex(textColor) {
    const textColors = this.renderedColor.map((colorCombination) =>
      Object.values(colorCombination).join("")
    );

    const index = textColors.indexOf(textColor);

    return index;
  }

  removePresentColor(textColor) {
    const index = this.#findIndex(textColor);
    const removedColor = this.renderedColor.splice(index, 1);
    
    return Object.keys(lodash.head(removedColor)).join("");
  }

  isColorPresent(color) {
    const textColors = this.renderedColor.map((colorCombination) =>
      Object.values(colorCombination).join("")
    );

    return textColors.includes(color);
  }

  resetValues() {
    this.renderedColor = [];
    this.point = 0;
    this.iterations = 0;
  }
}

export { ColorGame };
