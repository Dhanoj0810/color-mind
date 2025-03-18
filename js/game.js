import { ColorGame } from "./model.js";
import { addElement, removeElement, removeAllElement } from "./view.js";

const startColorCycle = (arena, gameSession) => {
  const intervalId = setInterval(() => {
    const colorCombination = gameSession.generateColorCombination();
    addElement(arena, colorCombination);
    gameSession.addPresentColor(colorCombination);
    gameSession.iterations += 1;

    if (gameSession.iterations > gameSession.maxIterations) {
      alert(`Game Over! Your score: ${gameSession.point}`);
      removeAllElement(arena, "div");
      gameSession.resetValues();
      clearInterval(intervalId);
    }
  }, 3000);
};

const startGame = (gameSession, e) => {
  const arena = document.getElementById("arena");
  const input = document.querySelector("input");

  input.focus();

  startColorCycle(arena, gameSession);

  input.addEventListener("change", (e) => {
    if (gameSession.isColorPresent(input.value)) {
      const className = gameSession.removePresentColor(input.value);
      gameSession.updatePoint();
      removeElement(className);
    }

    input.value = "";
  });
};

const gameSetUp = () => {
  const gameSession = new ColorGame();
  const colorMind = startGame.bind(null, gameSession);
  const button = document.getElementById("controller");

  button.addEventListener("click", colorMind);
};

window.onload = gameSetUp;
