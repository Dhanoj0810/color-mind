class ColorGame {
  constructor() {
    this.colors = [["black", "white"]];
    this.colorHistory = new Set();
    this.point = 0;
  }

  generateColorCombination() {
    return ["black", "white"];
  }

  updatePoint() {
    this.point += 1;
  }

  getCurrentPoint() {
    return this.point;
  }
}

const addElement = (parent, [bgColor, textColor]) => {
  const div = document.createElement("div");

  div.setAttribute("class", bgColor);
  div.textContent = textColor;

  parent.appendChild(div);
};

const removeElement = (className) => {
  const div = document.querySelector(`.${className}`).remove();
  console.log(div);
};

const startGame = (e) => {
  const gameSession = new ColorGame();
  const arena = document.getElementById("arena");
  const input = document.querySelector("input");

  const colorCombination = gameSession.generateColorCombination();
  addElement(arena, colorCombination);

  input.addEventListener("change", (e) => {
    if (colorCombination[1] === input.value) {
      removeElement(colorCombination[0]);
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
