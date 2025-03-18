const addElement = (parent, [bgColor, _]) => {
  const div = document.createElement("div");
  div.setAttribute("class", bgColor);
  div.textContent = bgColor;

  parent.appendChild(div);
};

const removeElement = (className) => {
  const element = document.querySelector(`.${className}`);

  if (element) element.remove();
};

const removeAllElement = (parent, element) => {
  const divs = parent.querySelectorAll(element);

  divs.forEach((div) => {
    parent.removeChild(div);
  });
};

export { addElement, removeElement, removeAllElement };
