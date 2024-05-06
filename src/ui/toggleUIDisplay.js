function makeInvisible(element) {
	element.classList.add('invisible');
}

function makeVisible(element) {
	element.classList.remove('invisible');
}

export { makeInvisible, makeVisible };
