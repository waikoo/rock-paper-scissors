function makeInvisible(element: HTMLElement) {
  element.classList.add('invisible');
}

function makeVisible(element: HTMLElement) {
  element.classList.remove('invisible');
}

export { makeInvisible, makeVisible };
