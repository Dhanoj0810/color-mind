class ColorGame {
  constructor() {
    this.colors = { black: "white" };
    this.presentColors = {};
    this.point = 0;
  }

  generateColorCombination() {
    const color = Object.keys(this.colors).join("");

    return [color, this.colors[color]];
  }

  updatePoint() {
    this.point += 1;
  }

  getCurrentPoint() {
    return this.point;
  }

  addPresentColor([key, value]) {
    this.presentColors[key] = value;
  }

  #findKey(value) {
    const combinations = Object.entries(this.presentColors);
    const key = combinations.reduce(
      (key, combination) => (combination[1] === value ? combination[0] : key),
      ""
    );

    return key;
  }

  removePresentColor(color) {
    const key = this.#findKey(color);

    delete this.presentColors[key];

    return key;
  }
}

const addElement = (parent, [bgColor, textColor]) => {
  const div = document.createElement("div");

  div.setAttribute("class", bgColor);
  div.textContent = textColor;

  parent.appendChild(div);
};

const removeElement = (className) => {
  document.querySelector(`.${className}`).remove();
};

const startGame = (e) => {
  const gameSession = new ColorGame();
  const arena = document.getElementById("arena");
  const input = document.querySelector("input");

  const colorCombination = gameSession.generateColorCombination();
  addElement(arena, colorCombination);
  gameSession.addPresentColor(colorCombination);

  input.addEventListener("change", (e) => {
    if (Object.values(gameSession.presentColors).includes(input.value)) {
      const className = gameSession.removePresentColor(input.value);
      removeElement(className);
      gameSession.updatePoint();
      console.log(gameSession.getCurrentPoint());
    }
    input.value = "";
  });
};

const gameSetUp = () => {
  const button = document.getElementById("controller");

  button.addEventListener("click", startGame);
};

window.onload = startGame;
