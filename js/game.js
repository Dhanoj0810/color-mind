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
    this.presentColors = {};
    this.point = 0;
    this.iterations = 0;
    this.maxIterations = 10;
    this.timer = null;
  }

  generateColorCombination() {
    const colorKeys = Object.keys(this.colors);
    const randomColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return [randomColor, this.colors[randomColor]];
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

  removePresentColor(color) {
    const key = this.#findKey(color);
    delete this.presentColors[key];
    return key;
  }

  #findKey(value) {
    const combinations = Object.entries(this.presentColors);
    const key = combinations.reduce(
      (key, combination) => (combination[1] === value ? combination[0] : key),
      ""
    );
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
  const element = document.querySelector(`.${className}`);
  if (element) element.remove();
};

const removeAllElement = (parent) => {
  parent.replaceChildren();
};

const startColorCycle = (arena, gameSession) => {
  intervalId = setInterval(() => {
    const colorCombination = gameSession.generateColorCombination();
    addElement(arena, colorCombination);
    gameSession.addPresentColor(colorCombination);
    gameSession.iterations += 1;
    if (gameSession.iterations > gameSession.maxIterations) {
      clearInterval(intervalId);
      alert(`Game Over! Your score: ${gameSession.point}`);
      removeAllElement(arena);
    }
  }, 4000);
};

const startGame = (e) => {
  const gameSession = new ColorGame();
  const arena = document.getElementById("arena");
  const input = document.querySelector("input");

  startColorCycle(arena, gameSession);

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

window.onload = gameSetUp;
